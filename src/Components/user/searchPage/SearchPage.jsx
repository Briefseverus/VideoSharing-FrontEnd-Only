// SearchPage.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link, useLocation } from 'react-router-dom';
import './searchPage.css'
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../slideBar/Sidebar';
const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const [searchTerm, setSearchTerm] = useState(query || '');
  const [searchResults, setSearchResults] = useState([]);
  const currentUser = useSelector((state) => state.auth.login?.currentUser.accessToken);

  // Debounced search function to limit the number of API calls
  const debouncedSearch = useCallback(debounce((query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    axios.get(`${process.env.REACT_APP_BACKEND_URL}api/videos/titles/${query}`, {
      headers: {
        Authorization: `Bearer ${currentUser}`, // Ensure the access token is being managed securely
      },
    })
    .then((response) => {
      setSearchResults(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    });
  }, 300), [currentUser,location]);

  useEffect(() => {
    // Call debounced search when searchTerm changes
    debouncedSearch(searchTerm);
    // Cancel the debounced call on cleanup
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    setSearchTerm(query || '');
  }, [query]);

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <Sidebar/>
        </Col>
        <Col sm={10}>
        <div className="search-page">
        <div className="search-results">
          <TransitionGroup>
            {searchResults?.map((video) => (
              <CSSTransition 
                key={video.id}
                timeout={300}
                classNames="result-fade"
              >
                <div className="search-result-item">
                  <img className="search-result-image" src='https://i.ytimg.com/vi/F3hDKPGU30g/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvuIGGccfvT9mQ7ErskinDYTYAag' alt={video.title} />
                  <div className="play-icon-container">
                    <FontAwesomeIcon icon={faPlayCircle} />
                  </div>
                  <Link className="search-result-link" to={`/video/${video.id}`}>
                    <h3 className="search-result-title">{video.title}</h3>
                    <p className="search-result-description">{video.description}</p>
                    <p className="search-result-channel">{video.channel.name}</p>
                  </Link>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
