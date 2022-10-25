import React from 'react';
import './AddPages.css';
import videoBG from '../assets/video.mp4';
import {Typography,TextField,FormControl,Select,MenuItem,InputLabel,FormControlLabel,Switch,Button,CardMedia,Card,CardContent} from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FlatwareIcon from '@mui/icons-material/Flatware';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useSelector } from 'react-redux';

const AddPages = () => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [bed, setBed] = useState(0);
  const [guests, setGuests] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [parking, setParking] = useState('');
  const [pets, setPets] = useState('');
  const [smoking, setSmoking] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [costPerNight, setCostPerNight] = useState('');
  const [description, setDescription] = useState('');
  const [kitchen, setKitchen] = useState(false);
  const [airCondition, setAirCondition] = useState(false);
  const [heating, setHeating] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [TV, setTV] = useState(false);
  const [hairdryer, setHairdryer] = useState(false);
  const [washingMachine, setWashingMachine] = useState(false);
  const [refrigerator, setRefrigerator] = useState(false);
  const [stove, setStove] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [img, setImg] = useState(null);
  const [photo1, setPhoto1] = useState("https://i.postimg.cc/FzWbxN6n/1212.png")
  const [photo2, setPhoto2] = useState("https://i.postimg.cc/FzWbxN6n/1212.png")
  const [photo3, setPhoto3] = useState("https://i.postimg.cc/FzWbxN6n/1212.png")
  const [photo4, setPhoto4] = useState("https://i.postimg.cc/FzWbxN6n/1212.png")
  const [photo5, setPhoto5] = useState("https://i.postimg.cc/FzWbxN6n/1212.png")

  


  const sendFile = React.useCallback(async () => {}, [img]);
  const user = useSelector((store) => store.toolkit.user)
  const ownerId = user.id;

  const navigate = useNavigate();

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleCost = (event) => {
    setCostPerNight(event.target.value);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleBed = (event) => {
    setBed(event.target.value);
  };

  const handleGuests = (event) => {
    setGuests(event.target.value);
    console.log('event.target.value guests', event.target.value);
  };

  const handleParking = (event) => {
    setParking(event.target.value);
  };

  const handlePets = (event) => {
    setPets(event.target.value);
  };

  const handleSmoking = (event) => {
    setSmoking(event.target.value);
  };

  const handleKitchen = () => {
    const yesno = !kitchen;
    setKitchen(yesno);
  };

  const handleCondition = () => {
    const yesno = !airCondition;
    setAirCondition(yesno);
  };

  const handleHeating = () => {
    const yesno = !heating;
    setHeating(yesno);
  };

  const handleWifi = () => {
    const yesno = !wifi;
    setWifi(yesno);
  };

  const handleTV = () => {
    const yesno = !TV;
    setTV(yesno);
  };

  const handleHairdryer = () => {
    const yesno = !hairdryer;
    setHairdryer(yesno);
  };

  const handleWashingMachine = () => {
    const yesno = !washingMachine;
    setWashingMachine(yesno);
  };

  const handleRefregirator = () => {
    const yesno = !refrigerator;
    setRefrigerator(yesno);
  };

  const handleStove = () => {
    const yesno = !stove;
    setStove(yesno);
  };

  const handlePhoto = (img) => {
    console.log('aaaaaaaaahadlephotos');
    console.log('img', img);
    const data = new FormData();
    data.append('avatar', img);
    axios
      .post('http://localhost:3001/addFlat/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setPhotos([
          ...photos,
          `http://localhost:3001/${res.data.path.split(' ').join('')}`,
        ])
      });
  };

  const handlePhoto1 = (img) => {
    console.log('handle1');
    console.log('img', img);
    const data = new FormData();
    data.append('avatar', img);
    axios
      .post('http://localhost:3001/addFlat/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setPhoto1(
          `http://localhost:3001/${res.data.path.split(' ').join('')}`,
        )
      });
  };

  const handlePhoto2 = (img) => {
    console.log('handle2');
    console.log('img', img);
    const data = new FormData();
    data.append('avatar', img);
    axios
      .post('http://localhost:3001/addFlat/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setPhoto2(
          `http://localhost:3001/${res.data.path.split(' ').join('')}`,
        )
      });
  };
  const handlePhoto3 = (img) => {
    console.log('handle3');
    console.log('img', img);
    const data = new FormData();
    data.append('avatar', img);
    axios
      .post('http://localhost:3001/addFlat/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setPhoto3(
          `http://localhost:3001/${res.data.path.split(' ').join('')}`,
        )
      });
  };
  const handlePhoto4 = (img) => {
    console.log('handle4');
    console.log('img', img);
    const data = new FormData();
    data.append('avatar', img);
    axios
      .post('http://localhost:3001/addFlat/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setPhoto4(
          `http://localhost:3001/${res.data.path.split(' ').join('')}`,
        )
      });
  };
  const handlePhoto5 = (img) => {
    console.log('handle5');
    console.log('img', img);
    const data = new FormData();
    data.append('avatar', img);
    axios
      .post('http://localhost:3001/addFlat/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setPhoto5(
          `http://localhost:3001/${res.data.path.split(' ').join('')}`,
        )
      });
  };

  const handleBathroom = (event) => {
    setBathroom(event.target.value);
  };

  const createAdd = () => {
    console.log('aaaaaaaaaaaaaaaaa');
    console.log('ownerId from createAd', ownerId);
    axios
      .post(
        'http://localhost:3001/addFlat',
        {
          ownerId,
          category,
          bed,
          bathroom,
          type,
          guests,
          parking,
          pets,
          smoking,
          country,
          city,
          address,
          costPerNight,
          description,
          kitchen,
          airCondition,
          wifi,
          TV,
          heating,
          hairdryer,
          washingMachine,
          refrigerator,
          stove,
          photos,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.statusText === 'OK') {
          navigate(`/flat/${res.data.newId}`);
        }
      });
  };

  return (
    <Box>
      <Box className="header__mytrips">
        <Box className="inside_mytrips">
          <Typography
            variant="bod1"
            style={{ color: 'white', fontSize: '45px', fontWeight: '500' }}
          >
            Откройте двери
          </Typography>
          <Typography
            variant="bod1"
            style={{ color: 'white', fontSize: '45px', fontWeight: '500' }}
          >
            гостям
          </Typography>
          <button
            onClick={createAdd}
            className="btn_add_flats"
          >
            <p style={{ color: 'white', fontWeight: '600' }}>Принять гостей</p>
          </button>
        </Box>
        <video
          style={{ display: 'flex', height: '100%' }}
          src={videoBG}
          autoPlay
          loop
          muted
        />
      </Box>
      <Box className="allField">
        <Box className="all__block">
          <Box className="input_block">
            <Box className="one">
              <Typography
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                variant="subtitle1"
                color="#7a7a7a"
              >
                <PlaceIcon
                  style={{
                    color: '#00c7ce',
                  }}
                />
                Местоположение
              </Typography>
              <hr
                style={{
                  margin: '5px 0 5px 0',
                  width: '100%',
                  height: '0.5px',
                  color: 'lightgray',
                  backgroundColor: 'lightgray',
                  border: 'none',
                }}
              />
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px 15px 0 15px',
                }}
              >
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: '410px' }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Категория
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Категория"
                    onChange={handleCategory}
                  >
                    <MenuItem value={'Город'}>Город</MenuItem>
                    <MenuItem value={'Море'}>Море</MenuItem>
                    <MenuItem value={'Горы'}>Горы</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: '410px', marginTop: '10px' }}
                >
                  <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Тип"
                    onChange={handleType}
                  >
                    <MenuItem value={'Квартира'}>Квартира</MenuItem>
                    <MenuItem value={'Комната'}>Комната</MenuItem>
                  </Select>
                </FormControl>
                <Box>
                  <TextField
                    variant="standard"
                    style={{ width: '410px', marginTop: '10px' }}
                    size="small"
                    label="Страна"
                    onChange={handleCountry}
                  />
                </Box>
                <Box>
                  <TextField
                    variant="standard"
                    style={{
                      width: '410px',
                      marginTop: '10px',
                      color: 'black',
                    }}
                    size="small"
                    label="Город"
                    onChange={handleCity}
                  />
                </Box>
                <Box>
                  <TextField
                    variant="standard"
                    style={{ width: '410px', marginTop: '10px' }}
                    size="small"
                    label="Адрес"
                    onChange={handleAddress}
                  />
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    padding: '5px',
                    width: '400px',
                    height: '48px',
                    background: '#eafccf',
                    marginTop: '10px',
                    borderRadius: '7px',
                  }}
                >
                  <VerifiedUserIcon style={{ color: '#0080006e' }} />
                  <Typography
                    align="left"
                    style={{
                      color: '#2d482e',
                      fontSize: '13px',
                      display: 'flex',
                      wordWrap: 'wrap',
                      lineHeight: '16px',
                    }}
                  >
                    Чтобы ваши данные не попали в базы мошенников, номер
                    квартиры не указывается, после бронирования сообщите гостю в
                    личном кабинете.
                  </Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    variant="outlined"
                    multiline
                    maxRows={10}
                    style={{
                      width: '410px',
                      marginTop: '10px',
                      marginBottom: '17px',
                    }}
                    size="small"
                    label="Описание"
                    onChange={handleDescription}
                  />
                </Box>
              </Box>
            </Box>
            <Box className="two">
              <Typography
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                variant="subtitle1"
                color="#7a7a7a"
              >
                <AccountBoxIcon
                  style={{
                    color: '#f98787',
                  }}
                />
                Основное
              </Typography>
              <hr
                style={{
                  margin: '5px 0 5px 0',
                  width: '100%',
                  height: '0.5px',
                  color: 'lightgray',
                  backgroundColor: 'lightgray',
                  border: 'none',
                }}
              />
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px 15px 0 15px',
                }}
              >
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: '410px', marginTop: '10px' }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Количество спальных мест
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Количество спальных мест"
                    onChange={handleBed}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: '410px', marginTop: '10px' }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Количество гостей
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Количество гостей"
                    onChange={handleGuests}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: '410px', marginTop: '10px' }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Ванная комната
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Ванная комната"
                    onChange={handleBathroom}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: '410px', marginTop: '10px' }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Парковка
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Парковка"
                    onChange={handleParking}
                  >
                    <MenuItem value="Нет">Нет</MenuItem>
                    <MenuItem value="Бесплатно">Бесплатно</MenuItem>
                    <MenuItem value="Платно">Платно</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: '410px', marginTop: '10px' }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Пребывание с питомцами
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Пребывание с питомцами"
                    onChange={handlePets}
                  >
                    <MenuItem value={true}>Да</MenuItem>
                    <MenuItem value={false}>Нет</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  size="small"
                  style={{
                    width: '410px',
                    marginTop: '10px',
                    marginBottom: '17px',
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Курение в помещении
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Курение в помещении"
                    onChange={handleSmoking}
                  >
                    <MenuItem value={true}>Да</MenuItem>
                    <MenuItem value={false}>Нет</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              className="itembox"
              style={{ marginTop: '40px', marginBottom: '20px' }}
            >
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                variant="subtitle1"
                color="#7a7a7a"
              >
                <FlatwareIcon
                  style={{
                    color: '#76bb81',
                  }}
                />
                Удобства
              </Typography>
              <hr
                style={{
                  margin: '5px 0 5px 0',
                  width: '100%',
                  height: '0.5px',
                  color: 'lightgray',
                  backgroundColor: 'lightgray',
                  border: 'none',
                }}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Кухня"
                labelPlacement="start"
                onChange={handleKitchen}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Кондиционер"
                labelPlacement="start"
                onChange={handleCondition}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Обогреватель"
                labelPlacement="start"
                onChange={handleHeating}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Wi-fi"
                labelPlacement="start"
                onChange={handleWifi}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Телевизор"
                labelPlacement="start"
                onChange={handleTV}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Фен"
                labelPlacement="start"
                onChange={handleHairdryer}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Стиральная машина"
                labelPlacement="start"
                onChange={handleWashingMachine}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Холодильник"
                labelPlacement="start"
                onChange={handleRefregirator}
              />
              <FormControlLabel
                control={<Switch default />}
                label="Плита"
                labelPlacement="start"
                onChange={handleStove}
              />
            </Box>
          </Box>
          <Box className="box__photoAdd">
            <Box>
              <input
                type="file"
                style={{
                  width: '420px',
                  height: '410px',
                  marginTop: '10px',
                  opacity: '0',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                }}
                size="small"
                label="Главное фото"
                onChange={(e) => {
                  console.log('e.target', e);
                  handlePhoto(e.target.files[0]);
                  handlePhoto1(e.target.files[0])
                }}
              />
              <CardMedia
                className="bigImgAdd"
                sx={{ borderRadius: '5% 0 0 5%' }}
                component="img"
                image={photo1} //?главная фотка
              />
            </Box>
            <Box className="fourPicAdd">
              <CardMedia
                className="smallImg1Add"
                sx={{ borderRadius: '0 0 0 0' }}
                component="img"
                image={photo2} //?маленькая фотка
              />
              <CardMedia
                className="smallImg2Add"
                sx={{ borderRadius: '0 0 0 0' }}
                component="img"
                image={photo4} //?маленькая фотка
              />
              <CardMedia
                className="smallImg3Add"
                sx={{ borderRadius: '0 10% 0 0' }}
                component="img"
                image={photo3} //?маленькая фотка
              />
              <CardMedia
                className="smallImg4Add"
                sx={{ borderRadius: '0 0 10% 0' }}
                component="img"
                image={photo5} //?маленькая фотка
              />
              <input
                type="file"
                style={{
                  width: '200px',
                  height: '200px',
                  marginTop: '10px',
                  opacity: '0',
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                }}
                size="small"
                label="Доп. фото 4"
                onChange={(e) => {
                  handlePhoto(e.target.files[0]);
                  handlePhoto5(e.target.files[0])
                }}
              />
              <input
                type="file"
                style={{
                  width: '200px',
                  height: '200px',
                  marginTop: '10px',
                  opacity: '0',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                }}
                size="small"
                label="Доп. фото 1"
                onChange={(e) => {
                  handlePhoto(e.target.files[0]);
                  handlePhoto2(e.target.files[0])
                }}
              />
              <input
                type="file"
                style={{
                  width: '200px',
                  height: '200px',
                  marginTop: '10px',
                  opacity: '0',
                  position: 'absolute',
                  top: '0',
                  right: '0',
                }}
                size="small"
                label="Доп. фото 2"
                onChange={(e) => {
                  handlePhoto(e.target.files[0]);
                  handlePhoto3(e.target.files[0])
                }}
              />
              <input
                type="file"
                style={{
                  width: '200px',
                  height: '200px',
                  marginTop: '10px',
                  opacity: '0',
                  position: 'absolute',
                  left: '0',
                  bottom: '0',
                }}
                size="small"
                label="Доп. фото 3"
                onChange={(e) => {
                  handlePhoto(e.target.files[0]);
                  handlePhoto4(e.target.files[0])
                }}
              />
            </Box>
            <Box className="cost__block">
              <Box className="disc__upload__pic">
                <FeedbackIcon />
                <Box
                  style={{
                    marginLeft: '5px',
                  }}
                >
                  <Typography
                    align="left"
                    style={{
                      color: '#545454',
                      fontSize: '13px',
                      display: 'flex',
                      wordWrap: 'wrap',
                      lineHeight: '17px',
                    }}
                  >
                    Загрузите основную фотографию и 4 дополнительных, кликнув на
                    соотвествующее место в макете.
                  </Typography>
                  <Typography
                    align="left"
                    style={{
                      color: '#545454',
                      fontSize: '13px',
                      display: 'flex',
                      wordWrap: 'wrap',
                      lineHeight: '17px',
                      marginTop: '8px',
                    }}
                  >
                    Фотографии на странице будут отображаться в том порядке, в
                    котором вы их расположите.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '30px',
                  marginTop: '30px',
                }}
              >
                <CreditScoreIcon
                  sx={{ display: 'flex', color: 'black', mr: 1 }}
                />

                <TextField
                  label="Стоимость за ночь"
                  variant="standard"
                  style={{
                    display: 'flex',
                    width: '147px',

                    marginBottom: '15px',
                  }}
                  size="small"
                  onChange={handleCost}
                />
                <CurrencyRubleIcon />
              </Box>
              <Button
                onClick={() => {
                  createAdd();
                  sendFile();
                }}
                variant="contained"
                style={{
                  background: 'black',
                  marginTop: '20px',
                  width: '250px',
                  height: '45px',
                }}
              >
                Разместить жилье
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box style={{ background: 'black', paddingBottom: '20px' }}>
        <Typography
          style={{ color: 'white', fontSize: '30px', paddingTop: '40px' }}
        >
          Новости и советы по приему гостей
        </Typography>
        <Box className="news">
          <a href="https://www.airbnb.ru/resources/hosting-homes/a/how-to-make-your-listing-stand-out-321">
            <Card
              className="helpBox"
              sx={{
                maxWidth: 345,
                borderRadius: '10px',
                background: '#3c3b3b',
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image="https://a0.muscache.com/im/pictures/3c930824-3462-40c4-afc2-19d5ef019594.jpg?im_w=480"
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  style={{ color: 'white', fontSize: '16px' }}
                  variant="body2"
                  color="text.secondary"
                >
                  Привлеките внимание к объявлению
                </Typography>
              </CardContent>
            </Card>
          </a>
          <a href="https://www.airbnb.ru/resources/hosting-homes/a/how-to-take-great-listing-photos-307">
            <Card
              className="helpBox"
              sx={{
                maxWidth: 345,
                borderRadius: '10px',
                background: '#3c3b3b',
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image="https://a0.muscache.com/im/pictures/451f156e-cc93-41be-ad1f-569c3bb350ca.jpg?im_w=480"
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  style={{ color: 'white', fontSize: '16px' }}
                  variant="body2"
                  color="text.secondary"
                >
                  Как сделать хорошие фото жилья
                </Typography>
              </CardContent>
            </Card>
          </a>
          <a href="https://www.airbnb.ru/resources/hosting-homes/a/how-to-set-a-pricing-strategy-15">
            <Card
              className="helpBox"
              sx={{
                maxWidth: 345,
                borderRadius: '10px',
                background: '#3c3b3b',
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image="https://a0.muscache.com/im/pictures/57d04174-24ab-4a42-a1d7-989d5b1dda47.jpg?im_w=480"
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  style={{ color: 'white', fontSize: '16px' }}
                  variant="body2"
                  color="text.secondary"
                >
                  Выбор стратегии ценообразования
                </Typography>
              </CardContent>
            </Card>
          </a>
          <a href="https://www.airbnb.ru/resources/hosting-homes/a/create-a-guidebook-to-share-your-local-tips-23">
            <Card
              className="helpBox"
              sx={{
                maxWidth: 345,
                borderRadius: '10px',
                background: '#3c3b3b',
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image="https://a0.muscache.com/im/pictures/c8c24577-9079-4af8-b64b-200feb855d33.jpg?im_w=480"
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  style={{ color: 'white', fontSize: '16px' }}
                  variant="body2"
                  color="text.secondary"
                >
                  Читайте советы местных в путеводителе
                </Typography>
              </CardContent>
            </Card>
          </a>
        </Box>
      </Box>
      <div className="footerAdd">
        <div className="footer__content_add">
          <span>© 2022 Nolimit, Inc.</span>
          <span>Support you everywhere.</span>
        </div>
        <div></div>
      </div>
    </Box>
  );
};

export default AddPages;
