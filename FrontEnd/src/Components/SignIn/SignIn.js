import React, {Component} from "react";

class SignIn extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            emailVal:'', 
            passwordVal:''
        }
    }

    onEmailChange = (event) => {
        this.setState({emailVal: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({passwordVal: event.target.value});
    }

    onSignIn = () => {
        console.log(this.state);
        fetch('http://localhost:2000/signin', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    email: this.state.emailVal ,
                    password: this.state.passwordVal    
                }
            )
        }).then(res => res.json())
        .then(user => {
            if(user.id)
            {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else   
                alert("Wrong email or password!");
        })
        
       
    }
    render(){
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba shadow-5 dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw6 center bg-lightest-blue o-80">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSignIn}/>
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" className="f6 link dim black db" onClick={()=> onRouteChange('register')}>Sign up</a>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default SignIn;
