import React from 'react';
import PropTypes from 'prop-types';
import HomePageItem from './HomePageItem';

const HomePageItems = (props) => {
  // debugger;
  return (
    <div>
      {props.pageProps.inputSearch !== undefined && props.pageProps.inputSearch.length > 0 ?
      <h3>{props.pageProps.inputSearch}</h3>
        :
        null
      }

      {props.pageProps.pageContent !== undefined
      && props.pageProps.pageContent.items !== undefined
      && props.pageProps.pageContent.items.length > 0 ?
        props.pageProps.pageContent.items.map((item, index) => {
          return (
            <HomePageItem
            item={item}
            restCallActions={props.restCallActions}
            key={index}
            />
          );
        })
        :
        null
      }
    </div>

  );
};

HomePageItems.propTypes = {
  restCallActions: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default HomePageItems;
