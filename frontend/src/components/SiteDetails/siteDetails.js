import React from 'react';
import {Button, Header, Icon, Card, Image} from 'semantic-ui-react';
import {Jumbotron} from 'reactstrap';
import { Link } from 'react-router-dom';
import react from '../../assets/img/react.png';
import mysql from '../../assets/img/mysql.png';
import python from '../../assets/img/python.png';
import exnode from '../../assets/img/expressnode.jpg';
import redux from '../../assets/img/redux.png';
import lambda from '../../assets/img/aws-lambda.jpg';
import django from '../../assets/img/Django.png';
import pycharm from '../../assets/img/pycharm.png';

const reactParagraph =
<div>
     <p>I decided to use React for all of my frontend work to get the experience.
    I initially watched React tutorials(Thank you Pluralsight!) to learn the basics. I've then used this project
   to solidify my skills and learn more about Reacts capabilities. </p>
    <p> This project has enabled me to
    learn so much about the way React works its magic and the many different ways
        to utilize it.
    </p>
</div>;


const pythonParagraph =
<div>
    <p>I've recently picked up Python on my own, taking online lectures and webinars. I love the ease of use and capabilities it has to offer.
    </p>
    <p>
        In my project, Python works as the server-side code, interacting with the mySql database when called upon.
        As I keep expanding on this project, I plan on implementing more server side functionality.
    </p>
</div>;


const djangoParagraph =
<div>
    <p>Django is utilized as my RESTful API. As someone recently picking up this Python framework, I
    love how easy it works with React and the Python ecosystem.
    </p>
    <p>
        I look forward to using Django more in this project and many more projects to come.
    </p>

</div>;


const awsLambdaParagraph =
<div>
    <p>AWS Lambda is such an awesome tool, acting as a serverless function. I'm using it to fetch data from an external web service and
    subsequently update my database with the information. I'm also using Amazon S3(storing static files), API Gateway, Amazon RDS, and other Amazon services
        with this project.
    </p>
    <p>
       The exciting part is that there's so much more its capable of. Definitely a tool I want to master!
    </p>
</div>;


const mySqlParagraph =
<div>
    <p>I'm using mySql for storing certain cryptocurrency data. I've used mySql on my personal website and
        I've enjoyed the ease of use, scalability, and high performance.
    </p>
</div>;


const nodeExpressParagraph =
<div>
    <p>I used NodeJs and a little bit of Express to create a function where my AWS Lambda can hook into and execute said function.
    </p>
    <p>
        I love the simplicity and capabilities NodeJs has.
    </p>
</div>;

const reduxParagraph =
<div>
    <p>I initially coded the front end piece using all React and no Redux. I've refactored some of my code to implement Redux
    and it's very easy to see why it's so popular. I've been able to simplify my code while making it faster. It's a win-win.</p>
</div>;

const pycharmParagraph =
<div>
    <p>I developed this application using Pycharm. I find Pycharm very intuitive and the best Python
    IDE in the market today.</p>
</div>;



const techUrls = {
    "React" : 'https://reactjs.org/',
    "Python" : 'https://www.python.org/',
    "Django" : 'https://www.djangoproject.com/',
    "Lambda" : 'https://aws.amazon.com/lambda/',
    "Redux" : 'https://redux.js.org/',
    "mySql" : 'https://www.mysql.com/',
    "NoEx" : 'https://expressjs.com/',
    "Pycharm" : 'https://www.jetbrains.com/pycharm/'

};



const siteDetails = () => (
 <div>
   <div>
       <Jumbotron>
            <Header as='h2' icon>
                <Icon name='idea' />
                Technologies Used
                <Header.Subheader>
                  and my thought process behind using them.
                </Header.Subheader>
           </Header>
       </Jumbotron>
    </div>

     <Card.Group centered>
        <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={react} />
            <Card.Header>
              React
            </Card.Header>
            <Card.Meta>
              React
            </Card.Meta>
            <Card.Description content={reactParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.React} target="_blank">
                     <Icon name="external"/>
                    About React
            </Button>
          </Card.Content>
        </Card>

         <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={python} />
            <Card.Header>
              Python
            </Card.Header>
            <Card.Meta>
              Python
            </Card.Meta>
            <Card.Description content={pythonParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.Python} target="_blank">
                     <Icon name="external"/>
                    About Python
            </Button>
          </Card.Content>
        </Card>

         <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={django} />
            <Card.Header>
              Django
            </Card.Header>
            <Card.Meta>
              Django
            </Card.Meta>
            <Card.Description content={djangoParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.Django} target="_blank">
                     <Icon name="external"/>
                    About Django
            </Button>
          </Card.Content>
        </Card>

        <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={lambda} />
            <Card.Header>
              AWS Lamda
            </Card.Header>
            <Card.Meta>
              AWS Lambda
            </Card.Meta>
            <Card.Description content={awsLambdaParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.Lambda} target="_blank">
                     <Icon name="external"/>
                    About Lambda
            </Button>
          </Card.Content>
        </Card>

         <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={mysql} />
            <Card.Header>
              MySql
            </Card.Header>
            <Card.Meta>
              MySql
            </Card.Meta>
            <Card.Description content={mySqlParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.mySql} target="_blank">
                     <Icon name="external"/>
                    About MySql
            </Button>
          </Card.Content>
        </Card>


         <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={redux} />
            <Card.Header>
              Redux
            </Card.Header>
            <Card.Meta>
              Redux
            </Card.Meta>
            <Card.Description content={reduxParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.Redux} target="_blank">
                     <Icon name="external"/>
                    About Redux
            </Button>
          </Card.Content>
        </Card>

        <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={exnode} />
            <Card.Header>
              NodeJs/Express
            </Card.Header>
            <Card.Meta>
              NodeJs/Express
            </Card.Meta>
            <Card.Description content={nodeExpressParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.NoEx} target="_blank">
                     <Icon name="external"/>
                    About NodeJs/Express
            </Button>
          </Card.Content>
        </Card>

         <Card color="blue">
          <Card.Content>
            <Image floated='right' size='mini' src={pycharm} />
            <Card.Header>
              PyCharm
            </Card.Header>
            <Card.Meta>
              PyCharm
            </Card.Meta>
            <Card.Description content={pycharmParagraph} />
          </Card.Content>
          <Card.Content extra>
            <Button color="blue" as={Link} to={techUrls.Pycharm} target="_blank">
                     <Icon name="external"/>
                    About Pycharm
            </Button>
          </Card.Content>
        </Card>
     </Card.Group>
</div>

);


export default siteDetails;