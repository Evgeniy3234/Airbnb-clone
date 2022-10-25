import React, { useEffect, useState } from "react";
import "./FavoritePage.css";
import "./MyTrips.css";
import "./AddPages.css";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Typography,Avatar,CardMedia,Card,CardContent,Box} from "@mui/material";
import EventBusyTwoToneIcon from "@mui/icons-material/EventBusyTwoTone";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function FavoritePage() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.toolkit.user);
  const userId = user.id;

  const [favorites, setFavorite] = useState([]); //! инфа о  лайкнутых квартирах
  const [firstFavorite, setFirstFavorite] = useState([]);
  const [myflats, setMyflats] = useState([]); //! инфа о моих квартирах
  const [mytrips, setMytrips] = useState([]); //! инфа от моих поездках
  const [avatar, setAvatar] = useState(""); //! аватарка из бд
  const [userinfo, setUserinfo] = useState({}); // инфа о юзере

  const handlePhoto = (img) => {
    const data = new FormData();
    data.append("favorite", img);
    axios
      .post(`http://localhost:3001/addavatar/${userId}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setAvatar(`http://localhost:3001/${res.data.path.split(" ").join("")}`);
      });
  };

  useEffect(() => {
    axios
      .post(
        `http://localhost:3001/favorite/${userId}`,
        { userId },
        { withCredentials: true }
      )
      .then((res) => {
        setFavorite(res.data.favorites);
        setFirstFavorite(res.data.favorites[0])
        setMyflats(res.data.myflats);
        setMytrips(res.data.mytrips);
      });
  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:3001/findinfo/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserinfo(res.data.user);
        setAvatar(res.data.user.picture);
      });
  }, []);

  if (!user.accesstoken) return <Navigate to="/" />;

  const regex = /\$\d+(?:\.\d+)?|\d+(?:\.\d+)?\x20+(?:грн|руб|р.|\$)/giu;

  return (
    <Box>
      <Box className="nav_LK">
        <img
          style={{ width: "100%" }}
          src="https://i.postimg.cc/905t4cYC/111.png"
          alt="навчик"
        />
      </Box>
      <Box className="all__content">
        <Box className="titileUserName">
          <Box className="avatar__info">
            <Box
              className="ava"
              style={{
                background: "white",
                borderRadius: "50%",
                height: "160px",
                width: "160px",
              }}
            >
              <input
                type="file"
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "10px",
                  opacity: "0",
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                }}
                onChange={(e) => {
                  handlePhoto(e.target.files[0]);
                  // window.location.reload();
                }}
              />
              {userinfo.picture ? (
                <>
                  <CardMedia
                    className="avaPic"
                    style={{
                      border: "5px solid white",
                      borderRadius: "50%",
                      height: "160px",
                      width: "160px",
                    }}
                    component="img"
                    height="220"
                    image={avatar}
                    alt="green iguana"
                  />
                </>
              ) : (
                <>
                <Avatar
            className="avaPic"
            style={{
              border: "5px solid white",
              borderRadius: "50%",
              height: "160px",
              width: "160px",
            }}
          />
                </>
              )}
            </Box>
            <Box className="insideNav">
              <Typography
                variant="subtitle3"
                style={{ fontSize: "22px", display: "flex" }}
              >
                {userinfo.username}
              </Typography>
              <Box>
                <Typography
                  variant="subtitle3"
                  style={{
                    fontSize: "15px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: "gray",
                  }}
                >
                  <AlternateEmailIcon
                    style={{
                      paddingRight: "5px",
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      color: "black",
                    }}
                  />
                  {userinfo.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="myTripsLK">
        <Typography
          variant="body3"
          style={{
            position: "relative",
            top: "20px",
            left: "-490px",
            fontSize: "26px",
            color: "black",
          }}
        >
          Мои поездки
        </Typography>
        <Box
          style={{
            borderRadius: "10px 0px 0px 10px",
            display: "flex",
            marginTop: "40px",
          }}
        >
          {mytrips[0] ? ( // проверка есть ли забронированные квартиры / поездки
            <>
              <div className="tripsCard">
                {mytrips.map((mytrip) => {
                  // если есть, то показываем карточки
                  return (
                    <Box
                      className="oneFavCard"
                      variant="subtitle2"
                      style={{
                        height: "auto",
                        margin: "0px 0 20px 20px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        textAlign: "center",
                        // border: '1px solid #c9c9c9',
                        color: "black",
                        background: "rgb(253 253 253)",
                      }}
                    >
                      <CardMedia
                        style={{
                          cursor: "pointer",
                          borderRadius: "10px 0px 0px 10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          verticalAlign: "center",
                          textAlign: "center",
                          height: "90px",
                          width: "90px",
                        }}
                        component="img"
                        image={mytrip["Flat.photos"][0]}
                        onClick={() => navigate(`/flat/${mytrip["Flat.id"]}`)}
                      />
                      <Box
                        style={{
                          width: "170px",
                          padding: "auto",
                          margin: "0px 5px 0px 10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle3"
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          {mytrip["Flat.country"]}, {mytrip["Flat.city"]}
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          {mytrip.type}
                        </Typography>

                        <Typography
                          variant="subtitle3"
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "grey",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          {mytrip["Flat.address"]}
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          style={{
                            marginTop: "7px",
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          Итоговая цена:
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          {mytrip.totalCost} р.
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          padding: "auto",
                          margin: "0px 15px 0px 5px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle3"
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "grey",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          {[
                            <EventNoteTwoToneIcon
                              style={{
                                paddingRight: "4px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                textAlign: "center",
                                fontSize: "18px",
                                color: "#34833a",
                              }}
                            />,
                            mytrip.startDate.toLocaleString().slice(0, -14),
                          ]}
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "grey",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          {[
                            <EventBusyTwoToneIcon
                              style={{
                                paddingRight: "4px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                textAlign: "center",
                                fontSize: "18px",
                                color: "#a53c3c",
                              }}
                            />,
                            mytrip.endDate.toLocaleString().slice(0, -14),
                          ]}
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          style={{
                            display: "flex",
                            fontSize: "13px",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "grey",
                            textAlign: "center",
                            flexDirection: "row",
                          }}
                        >
                          {[
                            <PortraitOutlinedIcon
                              style={{
                                paddingRight: "4px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                textAlign: "center",
                                fontSize: "18px",
                                color: "black",
                              }}
                            />,
                            mytrip["Flat.guestsQty"],
                          ]}
                        </Typography>
                      </Box>
                    </Box>
                  ); //поездки
                })}
              </div>
            </> // если нет поездок, то показываем карточку
          ) : (
            <>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Box className="tripsDisc">
                  <Box className="inside_Disc">
                    <RocketLaunchOutlinedIcon
                      sx={{ fontSize: "35px", color: "#00c7ce" }}
                    />
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "600",
                        margin: "20px 0 5px 0",
                      }}
                    >
                      Задумайся о жилье заранее
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "13px",
                        color: "#adaaaa",
                        fontWeight: "500",
                        margin: "0 0 7px 0",
                      }}
                    >
                      Пора придумать новые путешествия
                    </Typography>
                    <button
                      onClick={() => navigate("/")}
                      className="btn__trips"
                    >
                      <p style={{ color: "white", fontWeight: "600" }}>
                        Начать поиск
                      </p>
                    </button>
                  </Box>
                  <CardMedia
                    sx={{ borderRadius: "0px 10px 10px 0px", width: "600px" }}
                    component="img"
                    image="https://i.postimg.cc/fLNLbb1D/image-5.png"
                    alt="green iguana"
                  />
                </Box>
              </Box>
            </>
          )}

          <Box
            style={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "center",
              position: "relavite",
            }}
          >
            <a href="https://www.airbnb.ru/help/article/475/%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D1%8B-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F">
              <Box
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "22px",
                  color: "black",
                  height: "145px",
                  width: "310px",
                  background: "#e8fbff",
                  backgroundSize: "120%",
                  backgroundPositionX: "105px",
                  backgroundPositionY: "-40px",
                  backgroundImage: "url(https://i.postimg.cc/XJJtX1zL/cap.png)",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                  zIndex: "5",
                }}
              >
                <Typography
                  align="left"
                  style={{
                    width: "160px",
                    position: "relative",
                    padding: "10px 10px 10px 17px",
                    color: "#2d482e",
                    fontSize: "12px",
                    display: "flex",
                    wordWrap: "wrap",
                    lineHeight: "18px",
                  }}
                >
                  Если гость отменяет бронирование в течение 24 часов после
                  оформления или за 7 дней до начала Впечатления, он получает
                  полный возврат.
                </Typography>
              </Box>
            </a>
            <a href="https://github.com/EvgeniyaPodshibyakina/flat-rental-app-react">
              <Box
                style={{
                  marginTop: "15px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  textAlign: "center",
                  fontSize: "22px",
                  color: "black",
                  height: "145px",
                  width: "310px",
                  background: "rgb(253, 239, 239)",
                  backgroundSize: "100%",
                  backgroundPositionX: "0px",
                  backgroundPositionY: "9px",
                  backgroundImage:
                    "url(https://i.postimg.cc/1zPH3Wzd/6-removebg-preview.png)",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                }}
              >
                <Typography
                  align="right"
                  style={{
                    width: "160px",
                    position: "relative",
                    padding: "15px 15px 10px 17px",
                    color: "#2d482e",
                    fontSize: "13px",
                    display: "flex",
                    wordWrap: "wrap",
                    lineHeight: "18px",
                  }}
                >
                  Не можете найти бронирование? В Центр помощи
                </Typography>
              </Box>
            </a>
          </Box>
        </Box>
        <Box style={{ background: "whaite" }}></Box>
      </Box>
      <Box
        style={{
          display: "flex",
          width: "auto",
          paddingLeft: "20.1%",
          paddingRight: "15%",
        }}
      >
        <Typography
          variant="body3"
          style={{
            margin: "50px 0 20px 0",
            fontSize: "26px",
            color: "black",
          }}
        >
          Избранное
        </Typography>
      </Box>
      {firstFavorite['Flats.Favorite.flatId'] ? (
        <>
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "50px",
            }}
          >
            <Box
              style={{
                width: "1190px",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {favorites.map((favorite) => {
                  return (
                    <div>
                      {/* {favorite['Flats.address']} */}
                      <Card className="favCards" sx={{ maxWidth: 200 }}>
                        <Carousel showStatus={false} showArrows={true}>
                          {favorite["Flats.photos"].map((p) => {
                            return (
                              <CardMedia
                                style={{
                                  width: "200px",
                                }}
                                sx={{ borderRadius: "5%" }}
                                component="img"
                                height="200"
                                width="50"
                                image={p}
                                alt="green iguana"
                              />
                            );
                          })}
                        </Carousel>
                        <CardContent
                          sx={{
                            textAlign: "left",
                            padding: "10px 0 0 0",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigate(`/flat/${favorite["Flats.id"]}`)
                          } //* done
                        >
                          <div className="container__rate">
                            <Typography
                              style={{ fontSize: "13px" }}
                              variant="h7"
                              component="div"
                              align="left"
                            >
                              {favorite["Flats.country"]},{" "}
                              {favorite["Flats.city"]}
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "13px",
                              }}
                            >
                              <StarIcon sx={{ fontSize: "13px" }} />
                              <span>{favorite["Flats.rating"]}</span>
                            </div>
                          </div>
                          <Typography
                            style={{ fontSize: "13px" }}
                            variant="body2"
                            color="text.secondary"
                          >
                            {favorite["Flats.address"]}
                            <br />
                            9-15 окт.
                          </Typography>
                          <Typography
                            style={{ fontSize: "13px" }}
                            variant="body2"
                            color="text.secondary"
                          >
                            <b style={{ color: "black" }}>
                              {favorite["Flats.costPerNight"]}
                            </b>
                             руб./сутки
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ); //любимое
                })}
              </div>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Box className="myflatDisc">
              <Box className="myflatinside_Disc">
                <RocketLaunchOutlinedIcon
                  sx={{ fontSize: "35px", color: "#00c7ce" }}
                />
                <Typography
                  variant="subtitle3"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "600",
                    margin: "20px 0 5px 0",
                  }}
                >
                  У Вас пока нет ничего в избранном
                </Typography>
                <button
                  onClick={() => navigate("/")}
                  className="btn__trips"
                >
                  <p style={{ color: "white", fontWeight: "600" }}>
                    Добавить избранное
                  </p>
                </button>
              </Box>
              <CardMedia
                sx={{ borderRadius: "0px 10px 10px 0px", width: "820px" }}
                component="img"
                image="https://i.postimg.cc/yYpb4k1X/arredamento.jpg"
                alt="green iguana"
              />
            </Box>
          </Box>
        </>
      )}

      <Box
        style={{
          display: "flex",
          width: "auto",
          paddingLeft: "20.1%",
          paddingRight: "15%",
        }}
      >
        <Typography
          variant="body3"
          style={{
            margin: "20px 0 25px 0",
            fontSize: "26px",
            color: "black",
          }}
        >
          Мои квартиры
        </Typography>
      </Box>
      {myflats[0] ? (
        <>
          <Box
            style={{
              display: "flex",
              width: "auto",
              paddingLeft: "20.1%",
              paddingRight: "15%",
            }}
          >
            {myflats.map((el) => {
              return (
                <div>
                  {/* {favorite['Flats.address']} */}
                  <Card className="favCards" sx={{ maxWidth: 300 }}>
                    <Carousel showStatus={false} showArrows={true}>
                      {el.photos.map((p) => {
                        return (
                          <CardMedia
                            style={{
                              width: "300px",
                            }}
                            sx={{ borderRadius: "5%" }}
                            component="img"
                            height="300"
                            width="50"
                            image={p}
                            alt="green iguana"
                          />
                        );
                      })}
                    </Carousel>
                    <CardContent
                      sx={{
                        textAlign: "left",
                        padding: "10px 0 0 0",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/flat/${el.id}`)} //приходит андефайн
                    >
                      <div className="container__rate">
                        <Typography
                          style={{ fontSize: "13px" }}
                          variant="h7"
                          component="div"
                          align="left"
                        >
                          {el.country}, {el.city}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <StarIcon sx={{ fontSize: "13px" }} />
                          <span>Отзывы отсутсвуют</span>
                        </div>
                      </div>
                      <Typography
                        style={{ fontSize: "13px" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {el.address}
                        <br />
                        {el.type}
                      </Typography>
                      <Typography
                        style={{ fontSize: "13px" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        <b style={{ color: "black" }}>{el.costPerNight}</b>
                         руб./сутки
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ); //любимое
            })}
          </Box>
        </>
      ) : (
        <>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Box className="myflatDisc">
              <Box className="myflatinside_Disc">
                <RocketLaunchOutlinedIcon
                  sx={{ fontSize: "35px", color: "#00c7ce" }}
                />
                <Typography
                  variant="subtitle3"
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "600",
                    margin: "20px 0 5px 0",
                  }}
                >
                  Скоро вы сможете принимать гостей!
                </Typography>
                <Typography
                  variant="subtitle3"
                  sx={{
                    fontSize: "13px",
                    color: "#adaaaa",
                    fontWeight: "500",
                    margin: "0 0 7px 0",
                  }}
                >
                  Осталось добавить объявление о своей квартире
                </Typography>
                <button
                  onClick={() => navigate("/addFlats")}
                  className="btn__trips"
                >
                  <p style={{ color: "white", fontWeight: "600" }}>
                    Сдать жилье
                  </p>
                </button>
              </Box>
              <CardMedia
                sx={{ borderRadius: "0px 10px 10px 0px", width: "820px" }}
                component="img"
                image="https://i.postimg.cc/x8z7sK0S/image-6.png"
                alt="green iguana"
              />
            </Box>
          </Box>
        </>
      )}

      <div className="footerAdd">
        <div className="footer__content_add">
          <span>© 2022 Nolimit, Inc.</span>
          <span>Support you everywhere.</span>
        </div>
        <div></div>
      </div>
    </Box>
  );
}
