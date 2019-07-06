import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Podcasts } from '../../components/Podcasts';
import '../../styles/tabs.css';
import {
  renderFilteredBlogCards,
  renderAllEpisodeCards
} from '../../utils/helpers';

const RadioLanza = ({ data }) => {
  const workRadioLanzaCoverImg =
    data.workRadioLanzaCoverImg.childImageSharp.fluid;
  const workRadioLanza = {
    title: data.workRadioLanza.edges[0].node.frontmatter.title,
    path: data.workRadioLanza.edges[0].node.frontmatter.path,
    excerpt: data.workRadioLanza.edges[0].node.frontmatter.excerpt,
    html: data.workRadioLanza.edges[0].node.html
  };
  const radioLanzaBlogPosts = data.radioLanzaBlogPosts.edges;
  const renderRadioLanzaCards = renderFilteredBlogCards.bind(
    null,
    radioLanzaBlogPosts
  );
  const allRadioLanzaEpisodes = data.allRadioLanzaEpisodes.edges;
  return (
    <Layout>
      <Header title={workRadioLanza.title} tagline={workRadioLanza.excerpt} />
      <Img
        className={styles.image}
        alt="Radio Lanza"
        fluid={workRadioLanzaCoverImg}
      />
      <Podcasts />
      <div dangerouslySetInnerHTML={{ __html: workRadioLanza.html }} />
      <Tabs>
        <TabList>
          <Tab>
            <p>Episodes & show notes</p>
          </Tab>
          <Tab>
            <p>Podcast updates</p>
          </Tab>
        </TabList>
        <TabPanel>
          <p>
            {`The show notes! Readers familiar with Radio Lanza might already know that I derive almost as much pleasure crafting and curating the show notes as I do co-hosting the podcast itself. Maybe the whole podcast venture is just an excuse to write down and structure our own words in a bullet point fashion.`}
          </p>
          <p>
            Either way, below you will find the aforementioned show notes for
            each episode. Plus a nice embedded player, just in case you want to
            get fancy and upgrade to the ultimate listening experience while
            reading them.
          </p>
          {renderAllEpisodeCards(allRadioLanzaEpisodes)}
        </TabPanel>
        <TabPanel>
          <p>
            {`Here is a recollection of Radio Lanza blog posts covering announcements, ideas, and updates around the podcast itself.`}
          </p>
          {renderRadioLanzaCards('update')}
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export const query = graphql`
  {
    workRadioLanzaCoverImg: file(
      relativePath: { eq: "radio-lanza-cover.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    workRadioLanza: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(work)/(radio-lanza)/" }
      }
      limit: 1
    ) {
      ...allWorkPosts
    }
    allRadioLanzaEpisodes: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(episodes)/" } }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allRadioLanzaEpisodes
    }
    radioLanzaBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" }
        frontmatter: { tags: { in: ["radio lanza"] } }
      }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allBlogPosts
    }
  }
`;

RadioLanza.propTypes = {
  data: PropTypes.shape({
    workRadioLanzaCoverImg: PropTypes.object.isRequired,
    workRadioLanza: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    }),
    radioLanzaBlogPosts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string).isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    })
  }).isRequired
};

export default RadioLanza;
