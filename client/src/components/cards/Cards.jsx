import React, { useState, useEffect } from 'react';
import SingleCard from '../../components/singleCard/SingleCard';
import './Cards.css';
import Box from '@mui/material/Box';
import axios from 'axios';
import './Category.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCard, getFilterCard } from '../../RTKSlice/rtkslice';
import Loader from '../loader/Loader';
import { Typography } from '@mui/material';

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true); //! Подгрузка порционалная
  const [isFetching, setIsFetching] = useState(false); //! скелетоны
  const [catFilter, setCatFilter] = useState('All');
  const [all, setAll] = useState('catDef');
  const [city, setCity] = useState('cat1');
  const [sea, setSea] = useState('cat1');
  const [mount, setMount] = useState('cat1');

  const allHand = () => {
    setAll('cat1_on');
    setCity('cat1');
    setSea('cat1');
    setMount('cat1');
  };

  const allCity = () => {
    setAll('cat1');
    setCity('cat1_on');
    setSea('cat1');
    setMount('cat1');
  };

  const allSea = () => {
    setAll('cat1');
    setCity('cat1');
    setSea('cat1_on');
    setMount('cat1');
  };

  const allMount = () => {
    setAll('cat1');
    setCity('cat1');
    setSea('cat1');
    setMount('cat1_on');
  };

  const card = useSelector((store) => store.toolkit.card);
  const dispatch = useDispatch();

  const handlFilter = (catagory) => {
    setIsFetching(true);
    setCatFilter(catagory);

    axios.get(`http://localhost:3001/allFlat/${catagory}`).then((res) => {
      dispatch(getFilterCard(res.data));
    });
    setIsFetching(false);
  };

  useEffect(() => {
    return setIsFetching(true);
  }, []);

  useEffect(() => {
    if (fetching) {
      axios
        .post(
          'http://localhost:3001/allFlat',
          { currentPage },
          { withCredentials: true }
        )
        .then((res) => {
          console.log('res.data card', res.data);
          dispatch(getAllCard([...card, ...res.data.flat.rows]));
          setCurrentPage((prevState) => prevState + 10);
        })
        .finally(() => {
          setFetching(false);
          setIsFetching(false);
        });
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [catFilter]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      catFilter === 'All'
    ) {
      setFetching(true);
    }
  };

  return (
    <div>
      <div className="categ">
        <div className="categIcon">
          <Box
            className={all}
            onClick={(event) => {
              handlFilter('All');
              allHand();
            }}
          >
            <img
              src="https://i.postimg.cc/T14F8NBy/all.png"
              alt=""
              width={'28px'}
            />
            <Typography
              variant="subtitle2"
              style={{ fontSize: '13px', color: 'grey' }}
            >
              Общее
            </Typography>
          </Box>
          <Box
            className={city}
            onClick={(event) => {
              handlFilter('Город');
              allCity();
            }}
          >
            <img
              src="https://i.postimg.cc/4xQCyP90/city.png"
              alt=""
              width={'28px'}
            />

            <Typography
              variant="subtitle2"
              style={{ fontSize: '13px', color: 'grey' }}
            >
              Город
            </Typography>
          </Box>
          <Box
            className={sea}
            onClick={(event) => {
              handlFilter('Море');
              allSea();
            }}
          >
            <img
              src="https://i.postimg.cc/7Y1tn6ZG/sea.png"
              alt=""
              width={'28px'}
            />

            <Typography
              variant="subtitle2"
              style={{ fontSize: '13px', color: 'grey' }}
            >
              Море
            </Typography>
          </Box>
          <Box
            className={mount}
            onClick={(event) => {
              handlFilter('Горы');
              allMount();
            }}
          >
            <img
              src="https://i.postimg.cc/TPdzDbj3/mount.png"
              alt=""
              width={'28px'}
            />

            <Typography
              variant="subtitle2"
              style={{ fontSize: '13px', color: 'grey' }}
            >
              Горы
            </Typography>
          </Box>
        </div>
      </div>
      <Box
        className="wrapper"
        marginTop="20px"
        display="flex"
        justifyContent="start"
        alignItems="center"
      >
        {isFetching ? (
          <>
            <Loader /> <Loader /> <Loader /> <Loader /> <Loader /> <Loader />{' '}
            <Loader /> <Loader /> <Loader /> <Loader /> <Loader /> <Loader />{' '}
            <Loader /> <Loader /> <Loader /> <Loader /> <Loader /> <Loader />{' '}
            <Loader /> <Loader />
          </>
        ) : (
          card?.map((el) => (
            <SingleCard
              key={el.id}
              el={el}
            />
          ))
        )}
      </Box>
    </div>
  );
};

export default Cards;
