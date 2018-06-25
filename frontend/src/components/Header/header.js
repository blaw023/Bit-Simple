import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


export class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeItem : null
        }
    };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });


    render() {
        const activeItem = this.state.activeItem;

        return(
           <Menu activeIndex='home'>
            <Menu.Item
               name='home'
               as={Link}
               to='/'
               icon='home'
               active={activeItem === 'home'}
               content="Home"
               onClick={this.handleItemClick}
              />
            <Menu.Item
               name='aboutme'
               as={Link}
               to='/aboutme'
               icon='user circle'
               active={activeItem === 'aboutme'}
               content="About Me"
               onClick={this.handleItemClick}
              />
             <Menu.Item
               name='sitedetails'
               as={Link}
               to='/details'
               icon='puzzle'
               active={activeItem === 'sitedetails'}
               content="Site Details"
               onClick={this.handleItemClick}
              />
          </Menu>
        )
    }
}

export default Header;