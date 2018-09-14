import React from 'react';
import PropTypes from 'prop-types';

import PageHeader from '../components/PageHeader';
import PostLink from '../components/PostLink';
import Layout from '../templates/Layout';

const Blog = ({ data }) => {
  const Posts = data.allMarkdownRemark.edges;
  const PostsList = Posts
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => (
      <PostLink
        key={edge.node.id}
        date={edge.node.frontmatter.date}
        excerpt={edge.node.frontmatter.excerpt}
        path={edge.node.frontmatter.path}
        tags={edge.node.frontmatter.tags}
        title={edge.node.frontmatter.title}
      />));

  return (
    <Layout>
      <PageHeader
        title="Blog"
        tagline="Ideas Were Written"
      />
      {PostsList}
    </Layout>
  );
};

export const blogQuery = graphql`
  query blogQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(markdown)/" } }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            excerpt
            path
            tags
            title
          }
        }
      }
    }
  }
`;

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          excerpt: PropTypes.string,
          id: PropTypes.string,
          totalCount: PropTypes.number,
          frontmatter: PropTypes.shape({
            date: PropTypes.string,
            excerpt: PropTypes.string,
            path: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
          }),
        }),
      ),
    }),
  }).isRequired,
};

export default Blog;
