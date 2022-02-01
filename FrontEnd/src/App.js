import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import LinkInput from './Components/LinkInput/LinkInput';
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import Image from './Components/Image/Image';
import SignIn from './Components/SignIn/SignIn';
import logo from "./Components/Logo/logo.png"
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';

const app = new Clarifai.App({
  apiKey: '0165cc8b155f46039cf51f253b1dc35e'
});

const options = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 4,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 2,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxArray: [],
      route: 'signin',
      user:{
        id:'',
        name: '',
        email:'',
        password:'',
        entries:0,
        joined: ''
      }
    }
  }

  // calculateLocation = (res) => {
  //   const info = res.outputs[0].data.regions[0].region_info.bounding_box;
  //   console.log(info);
  //   const image = document.getElementById("inputImage");
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return(
  //     {
  //     topRow:info.top_row * height,
  //     bottomRow:height - (info.bottom_row * height),
  //     leftCol:info.left_col*width,
  //     rightCol: width - (info.right_col * width)
  //     }
  //   );
  // }
  // componentDidMount()
  // {
  //    fetch('http://localhost:2000')
  //    .then(res => res.json())
  //    .then(console.log);
  // }


  calculateLocation = (res) => {
    const infoArray = res.outputs[0].data.regions.map(item => item.region_info.bounding_box);
    console.log("Info array is ", infoArray);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const ValueArray = infoArray.map(info => {
      return (
        {
          topRow: info.top_row * height,
          bottomRow: height - (info.bottom_row * height),
          leftCol: info.left_col * width,
          rightCol: width - (info.right_col * width)
        }
      );
    });
    console.log("Value Array is ", ValueArray);
    return ValueArray;

  }

  displayFace = (boxArray) => {
    console.log("Box Array is done");
    this.setState({ boxArray: boxArray }, console.log(boxArray));
  }

  onInputChange = (event) => {
    console.log("Input Changed");
    //console.log(event.target.value);
    this.setState({ input: event.target.value });
  }

  onButtonClick = () => {
    console.log("Button Clicked");
    this.setState({ imageUrl: this.state.input });
    //console.log(event.target.value);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => { 
        if(response)
          {
            fetch('http://localhost:2000/image', {
              method:'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(
                  {
                      id: this.state.user.id    
                  }
              )
              }).then(res => res.json())
              .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
          }
        this.displayFace(this.calculateLocation(response)) })
      .catch((err) => {
        console.log(err);
      });
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  onLoadUser = (data) => {
    this.setState({
      user:{
        id:data.id,
        name: data.name,
        email:data.email,
        password:data.password,
        entries:data.entries,
        joined: data.joined
      }
    })
  }

  render() {
    console.log("Rendering");
    console.log("BA", this.state.boxArray);
    return (
      <>
        <div className="App">
          <Particles options={options} className='particles'></Particles>

          {
            (this.state.route === 'signin') ?
              <><img id="sidelogo" src={logo} alt="logo" /><SignIn onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange} /></> :
              (
                (this.state.route === 'register') ?
                  <><img id="sidelogo" src={logo} alt="logo" /><Register onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange} /></> :
                  <>
                    <div className="header">
                      <Logo />
                      <Navigation onSignOut={this.onRouteChange} />
                    </div>
                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                    <LinkInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} /><Image imageUrl={this.state.imageUrl} boxArray={this.state.boxArray} /></>
              )
          }
        </div>
      </>

    );
  }
}

export default App;
