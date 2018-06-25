import React from 'react';
import scranton from '../../assets/img/scranton.jpg';
import family from '../../assets/img/family.JPG';
import blawjo from '../../assets/img/blawj.jpg';
import bball from '../../assets/img/bball.jpg';
import {Card, Icon, Image, CardGroup, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {Player} from 'video-react';



const aboutMe = () => (
  <div className="container-fluid">
    <CardGroup itemsPerRow={6} stackable>
          <Card>
            <Image src={scranton} size="medium" />
            <Card.Content>
              <Card.Header>
                Branden Lawrence
              </Card.Header>
              <Card.Meta>
                <span className='info'>
                  Taken in 2017
                </span>
              </Card.Meta>
              <Card.Description>
                  <p>I proudly consider myself one of the biggest Office fans on this earth.
                 So making a stop in Scranton, Pa and taking this picture was definitely special.
                  </p>
                  <p>
               "You know what they say. "Fool me once, strike one, but fool me twice... strike three."
                  -Michael Scott
                  </p>
                  <hr/>
                  <div>
                    <Button as={Link} to={socialMediaLinks.Instagram} target="_blank"
                                circular color='instagram' icon='instagram'/>
                    <Button as={Link} to={socialMediaLinks.Twitter} target="_blank"
                                circular color='twitter' icon='twitter'/>
                     <Button as={Link} to={socialMediaLinks.Linkedln} target="_blank"
                                circular color='linkedin' icon='linkedin'/>
                     <Button as={Link} to={socialMediaLinks.Github} target="_blank"
                                circular color='purple' icon='github'/>
                      <Button as={Link} to={socialMediaLinks.Personal} target="_blank"
                                circular color='yellow' icon='user outline'/>
                  </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='world' />
                Scranton, Pennsylvania
              </a>
            </Card.Content>
          </Card>

         <Card>
            <Player>
                <source src="https://s3.amazonaws.com/brandensite/Branden+Site+Videos/12433793_1944005145825611_212069612_n.mp4" />
            </Player>
            <Card.Content>
              <Card.Header>
               My Best Michael Jordan Impression Pt.1
              </Card.Header>
              <Card.Meta>
                <span className='info'>
                  Taken in 2016
                </span>
              </Card.Meta>
              <Card.Description>
               <p>
                   Ever since I was a little kid I wanted to dunk. I'll always remember when after I landed my first real dunk, I ran around my house
                   around 5 times in celebration.
               </p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='world' />
                Hartford, Connecticut
              </a>
            </Card.Content>
          </Card>

        <Card>
            <Player>
                <source src="https://s3.amazonaws.com/brandensite/Branden+Site+Videos/13220422_635775746588857_1223229510_n.mp4" />
            </Player>
            <Card.Content>
              <Card.Header>
                My Best Michael Jordan Impression Pt.2
              </Card.Header>
              <Card.Meta>
                <span className='info'>
                  Taken in 2016
                </span>
              </Card.Meta>
              <Card.Description>
               <p>
                   My next dunk will be a 360 windmill. Just give me 1 more year!
               </p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='world' />
                Hartford, Connecticut
              </a>
            </Card.Content>
          </Card>

           <Card>
            <Image src={blawjo} size="medium"/>
            <Card.Content>
              <Card.Header>
                Branden + Joana
              </Card.Header>
              <Card.Meta>
                <span className='info'>
                  Taken in 2017
                </span>
              </Card.Meta>
              <Card.Description>
                My girlfriend said when I make a new website, I had to put one picture of her on it.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='world' />
                New York City
              </a>
            </Card.Content>
          </Card>

            <Card>
            <Image src={family} size="medium" />
            <Card.Content>
              <Card.Header>
                Branden + Family
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                 Taken in 2018
                </span>
              </Card.Meta>
              <Card.Description>
                  <p>
                      One of my all time favorite pictures. Taken at a recently family reunion in Jamaica.
                  </p>
                      <p>
                    I am proud of my Jamaican heritage. Most of my family are still in Jamaica, so being
                  able to visit, reconnect, and make new experiences is something I will always cherish.
                  </p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='world' />
                St. Ann, Jamaica
              </a>
            </Card.Content>
          </Card>

            <Card>
            <Image src={bball} size="medium"/>
            <Card.Content>
              <Card.Header>
                Branden + Team
              </Card.Header>
              <Card.Meta>
                <span className='info'>
                  Taken in 2017
                </span>
              </Card.Meta>
              <Card.Description>
               <p>Basketball is my first love. I've played the game ever since I was a little kid.
                  When I was stressed or in a bad mood, basketball was the one to pick me up and
                  forget about things even if it was for a little.
               </p>
                  <p>I've won a lot of trophies and lost a lot of
                      championships. But the one thing that will stay
                      the same is my love for the game. </p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='world' />
                Trumbull, Connecticut
              </a>
            </Card.Content>
          </Card>
    </CardGroup>
  </div>
);

const socialMediaLinks = {
    "Linkedln": "//www.linkedin.com/in/branden-lawrence-b0191b81/" ,
    "Instagram": "//www.instagram.com/blaw023/" ,
    "Twitter": "//twitter.com/blaw023" ,
    "Github": "//github.com/blaw023",
    "Personal": "//aboutbranden.azurewebsites.net"

};

export default aboutMe;