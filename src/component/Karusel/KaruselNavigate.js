// import React from "react";
// import Carousel from "react-material-ui-carousel";
// import autoBind from "auto-bind";
// import "../Karusel/KaruselNavigate.css";

// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
// } from "@material-ui/core";

// function Banner(props) {
//   if (props.newProp) console.log(props.newProp);
//   const contentPosition = props.contentPosition
//     ? props.contentPosition
//     : "left";
//   const totalItems = props.length ? props.length : 3;
//   const mediaLength = totalItems - 1;

//   let items = [];
//   for (let i = 0; i < mediaLength; i++) {
//     const item = props.item.Items[i];
//     let items = [];
//     // const content = (
//     //   <Grid item xs={12 / totalItems} key="content">
//     //     <CardContent className="Content">
//     //     </CardContent>
//     //   </Grid>
//     // );

//     const media = (
//       <Grid item xs={12 / totalItems} key={item.index}>
//          <video src={item.Image} autoPlay loop muted ></video>
//       </Grid> 
//     );

//     items.push(media);
//   }

//   // if (contentPosition === "left") {
//   //   items.unshift(content);
//   // } else if (contentPosition === "right") {
//   //   items.push(content);
//   // } else if (contentPosition === "middle") {
//   //   items.splice(items.length / 2, 0, content);
//   // }

//   return (
//     <Card raised className="Banner">
//       <Grid container spacing={0} className="BannerGrid">
//         {items}
//       </Grid>
//     </Card>
//   );
// }

// const items = [
//   {
//    Items: [
//      {
//        Image: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",

//        Video: "https://player.vimeo.com/external/451360990.sd.mp4?s=93ad6ceac1b500266f2bf94470d032cd6aacfb42&profile_id=139&oauth2_token_id=57447761"
//      }
//    ]
//   },
// ]
// class KaruselNavigate extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       autoPlay: true,
//       animation: "fade",
//       indicators: true,
//       timeout: 500,
//       navButtonsAlwaysVisible: false,
//       navButtonsAlwaysInvisible: false,
//       cycleNavigation: true,
//     };

//     autoBind(this);
//   }

//   toggleAutoPlay() {
//     this.setState({
//       autoPlay: !this.state.autoPlay,
//     });
//   }

//   toggleIndicators() {
//     this.setState({
//       indicators: !this.state.indicators,
//     });
//   }

//   toggleNavButtonsAlwaysVisible() {
//     this.setState({
//       navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible,
//     });
//   }

//   toggleNavButtonsAlwaysInvisible() {
//     this.setState({
//       navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible,
//     });
//   }

//   toggleCycleNavigation() {
//     this.setState({
//       cycleNavigation: !this.state.cycleNavigation,
//     });
//   }

//   changeAnimation(event) {
//     this.setState({
//       animation: event.target.value,
//     });
//   }

//   changeTimeout(event, value) {
//     this.setState({
//       timeout: value,
//     });
//   }

//   render() {
//     return (
//       <div style={{ marginTop: "50px", color: "#494949" }}>
//         <Carousel
//           className="Example"
//           autoPlay={this.state.autoPlay}
//           animation={this.state.animation}
//           indicators={this.state.indicators}
//           timeout={this.state.timeout}
//           cycleNavigation={this.state.cycleNavigation}
//           navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
//           navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}>
//           {items.map((item, index) => {
//             return (
//               <Banner
//                 item={item}
//                 key={index}
//                 contentPosition={item.contentPosition}
//               />
//             );
//           })}
//         </Carousel>
//       </div>
//     );
//   }
// }

// export default KaruselNavigate;

import React from 'react';
import Video from './Video/vid-1.mp4'
const KaruselNavigate = () => {
  return (
    <div>
      <video src={Video} loop muted autoPlay style={{width: "100%", height: "100%"}}></video>
      {/* <video  style={{width: "100%", height: "100%"}} url='https://player.vimeo.com/external/554386012.sd.mp4?s=4ba06641da4f5d1ea387b4d8ba0fc037ef3559df&profile_id=165&oauth2_token_id=57447761' loop muted autoPlay> </video> */}
    </div>
  );
};

export default KaruselNavigate;