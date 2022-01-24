import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import LinkInput from './Components/LinkInput/LinkInput';
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import Image from './Components/Image/Image';

const app  =new Clarifai.App({
  apiKey:'0165cc8b155f46039cf51f253b1dc35e'
});

const options={
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

class App extends Component{
  constructor()
  {
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }
  }

  calculateLocation = (res) => {
    const info = res.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(info);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return(
      {
      topRow:info.top_row * height,
      bottomRow:height - (info.bottom_row * height),
      leftCol:info.left_col*width,
      rightCol: width - (info.right_col * width)
      }
    );
  }

  displayFace = (box) =>
  {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input:event.target.value});
  }

  onButtonClick = (event) =>{
    this.setState({imageUrl:this.state.input});
    console.log(event.target.value);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFace(this.calculateLocation(response)))
    .catch((err) => {
      console.log(err);
     });
  }

  render(){
    return (
      <>
        <Particles options={options} className='particles'></Particles>
        <div className="App">
            <div className="header">
              <Logo />
              <Navigation />
            </div>
            <LinkInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
            <Image imageUrl={this.state.imageUrl} box={this.state.box}/>
          </div>
      </>
    );
  }
}

export default App;
