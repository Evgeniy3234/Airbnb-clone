import React, { useState, useEffect } from "react";
import "./SingleCard.css";
import "./myNewGalleryStyles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import axios from "axios";
import { useSelector } from "react-redux";

const SingleCard = ({ el, isFetching }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } }; //? Смена стилей на сердечке после клика
  const navigate = useNavigate();
  const user = useSelector((store) => store.toolkit.user);
  const userId = user.id;
  const id = el.id;
  const [color, setColor] = useState('')

  useEffect(() => {
    if (userId) {
      axios
        .post('http://localhost:3001/favorite/one', { userId, id }, { withCredentials: true })
        .then((res) => {
          if (res.data === 'yes') {
            setColor('red')
          }
        });
    }
  }, []);


  const handleAddToFav = async () => {
    if (userId) {
      const result = await axios.post(
        "http://localhost:3001/favorite",
        { userId, id },
        { withCredentials: true }
      );
    }
  };

  const handleDelFromFav = async() => {
    if (userId) {
      console.log("add to fav");
      const result = await axios.post(
        "http://localhost:3001/favorite/delete",
        { userId, id },
        { withCredentials: true },
      );
      window.location.reload();
    }
  }

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "20px",
              heigth: "20px",
              position: "absolute",
              top: "10px",
              right: "30px",
              zIndex: "3",
            }}
          >
             {userId ? <>{
              color === 'red' ? 
              <Checkbox
                className="like"
                {...label}
                icon={<Favorite style={{ color: "#ff6464" }} />}
                checkedIcon={<Favorite style={{ color: "#ff6464" }} />}
                onChange={handleDelFromFav}
              />
              :
              <Checkbox
                className="like"
                {...label}
                icon={<FavoriteBorder/>}
                checkedIcon={<Favorite style={{ color: "#ff6464" }} />}
                onChange={handleAddToFav}
              />
            }</> : 
              <Checkbox
                className="like"
                {...label}
                icon={<FavoriteBorder/>}
                checkedIcon={<FavoriteBorder/>}
              />
            }
          </div>
          <Card
            sx={{
              maxWidth: 305,
              maxHeight: 390,
              paddingLeft: "20px",
              marginBottom: "20px",
              border: 0,
              boxShadow: 0,
            }}
          >
            <Box className="caruselMain">
              <Carousel className="eben" showStatus={false} showArrows={true}>
                {el.photos.map((p) => {
                  return (
                    <CardMedia
                      sx={{ borderRadius: "5%" }}
                      component="img"
                      height="290"
                      width="305"
                      image={p}
                      alt="green iguana"
                    />
                  );
                })}
              </Carousel>
            </Box>
            <CardContent
              className="card__content"
              sx={{ textAlign: "left", padding: "10px 0 0 0" }}
              onClick={() => navigate(`/flat/${el.id}`)}
            >
              <div className="container__rate">
                <Typography variant="h7" component="div" align="center">
                  {el.country}, {el.city}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StarIcon sx={{ fontSize: "16px" }} />
                  <span>{el.rating}</span>
                </div>
              </div>
              <Typography variant="body2" color="text.secondary">
                {el.address}
                <br />
                14-19 окт.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b style={{ color: "black" }}>{el.costPerNight}</b> руб./сутки
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SingleCard;
