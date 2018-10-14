
import React from 'react';
import {Divider, Image, Menu, Button} from 'semantic-ui-react';
// import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';
import Footer from '../Nav/Footer';


const src = "../images/Number-4.png";
const srcMid = "../images/RemitSafe.net.ico";
const srcCartoon = "../images/404.png";

const NotFound = () => (
    <div>
        
        <Divider hidden/>
        <div className={"ui container center aligned"}><br/><br/>
            <Image.Group >
                <Image src={src} size='tiny' centered />
                <Image src={srcMid} size='tiny' centered />
                <Image src={src} size='tiny' centered />
            </Image.Group>
        </div>

        
        <div className={"ui container center aligned"}>
            <h2 style={{fontSize: '50px', textAlign: 'center'}} >
                Page Not Found
            </h2>
            <Divider hidden/>

        </div>
        <div style={{width: '50%'}} className={"ui container center aligned"}>
            <Divider hidden/>

            <h3 style={{textAlign: 'center'}} >
                Go back to the <Link to="/admin">Dashboard</Link>.
            </h3>
        </div>
        <Divider hidden/>
        
        <Footer isVerify={true}/>


    </div>
);

export default NotFound;