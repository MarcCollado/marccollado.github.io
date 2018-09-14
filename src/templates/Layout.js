import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import {
  mobile, tablet, desktop,
} from '../utils/breakpoints';
import {
  black, fakeAsbestos, turquoise, eggShell,
} from '../utils/colors';
import {
  Title1, Title2, Title3, BodyText, BodyLink, MetaText,
} from '../utils/theme';

const Layout = ({ children }) => (
  <Container>
    <Navbar />
    <Content>
      {children}
    </Content>
    <Footer />
  </Container>
);

const Container = styled.div`
  min-width: 320px;

  @media (min-width: ${mobile}) {

  }

  @media (min-width: ${tablet}) {

  }

  @media (min-width: ${desktop}) {

  }
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  max-width: 800px;
  padding: 0em 2em;

  @media (min-width: ${mobile}) {
    padding: 0em 3em;
  }

  @media (min-width: ${tablet}) {
    padding: 0em 4em;
  }

  @media (min-width: ${desktop}) {
    padding: 0em;
  }
`;

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
