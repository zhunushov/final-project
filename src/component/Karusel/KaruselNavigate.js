import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "../Karusel/KaruselNavigate.css";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core";

function Banner(props) {
  if (props.newProp) console.log(props.newProp);
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={12 / totalItems} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}

const items = [
  {
    Name: "Париж",
    Caption: "Город любви!",
    Image:
      "https://yandex.ru/images/search?pos=2&img_url=https%3A%2F%2Fimg3.goodfon.com%2Foriginal%2F5416x3611%2Fc%2Fdc%2Fparizh-franciya-noch-ogni-2465.jpg&text=paris&rpt=simage",
    contentPosition: "left",
    Items: [
      {
        Image: "https://i.ytimg.com/vi/3TxDZbjOnnw/maxresdefault.jpg",
      },
      {
        Image:
          "http://cdn.lightgalleries.net/4bd5ec0f44d0a/images/paris_2014_011-1.jpg",
      },
    ],
  },
  {
    Name: "New Yourk",
    Caption: "Финансовый город!",
    contentPosition: "middle",
    Items: [
      {
        Image:
          "https://cdn.viewing.nyc/assets/media/55cffa315520cfeab6626f71ee9fb2b0/elements/35fd3b889d5affff41dae616a969e840/xl/5f992681-db6d-4741-b611-8006ad158a82_4x.jpg",
      },
      {
        Image:
          "https://wpcluster.dctdigital.com/sundaypost/wp-content/uploads/sites/13/2016/09/28582727.jpg",
      },
    ],
  },
  {
    Name: "Сингапур",
    Caption: "Cамое время полететь в Сигапур!",
    contentPosition: "right",
    Items: [
      {
        Image:
          "https://avatars.mds.yandex.net/get-zen_doc/3644482/pub_607fd6d2a17092441498ab6c_607fd93aba83cd2567dcfc11/scale_1200",
      },
      {
        Image:
          "https://avatars.mds.yandex.net/get-zen_doc/1931555/pub_5eb278697196c61aab11b0ee_5eb27ae45d462a32492c44bd/scale_1200",
      },
    ],
  },
  {
    Name: "Ыссык-кол",
    Caption: "Жемчужина Кыргызстана!",
    Items: [
      {
        Image:
          "https://avatars.mds.yandex.net/i?id=ba55994eab196debae60b19b82c4f88f-4507927-images-thumbs&n=13",
      },
      {
        Image:
          "https://avatars.mds.yandex.net/i?id=def3203af256310bcb83d73c63ba1cfb-4407994-images-thumbs&n=13",
      },
    ],
  },
  {
    Name: "Корея",
    Caption: "Крассивый город для отдыха глаз!",
    contentPosition: "middle",
    Items: [
      {
        Image: "https://offshoreview.eu/wp-content/uploads/2016/08/43053.jpg",
      },
      {
        Image:
          "https://mywishboard.com/thumbs/wish/f/u/n/1020x0_jsmojfmbrrywcivr_jpg_bc5b.jpg",
      },
    ],
  },
];

class KaruselNavigate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: "fade",
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: true,
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay,
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators,
    });
  }

  toggleNavButtonsAlwaysVisible() {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible,
    });
  }

  toggleNavButtonsAlwaysInvisible() {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible,
    });
  }

  toggleCycleNavigation() {
    this.setState({
      cycleNavigation: !this.state.cycleNavigation,
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value,
    });
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value,
    });
  }

  render() {
    return (
      <div style={{ marginTop: "50px", color: "#494949" }}>
        <Carousel
          className="Example"
          autoPlay={this.state.autoPlay}
          animation={this.state.animation}
          indicators={this.state.indicators}
          timeout={this.state.timeout}
          cycleNavigation={this.state.cycleNavigation}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}>
          {items.map((item, index) => {
            return (
              <Banner
                item={item}
                key={index}
                contentPosition={item.contentPosition}
              />
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default KaruselNavigate;
