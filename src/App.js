import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
import background from './image/background.jpg';

const styles = (theme) => ({
  main: {
    height: "1500px",
    width: "960px",
    display: "flex",
    flexDirection: "column",
  },
  article: {
    height: "400px",
    width: "960px",
    margin: "25px",
    font: "26px",
    padding: "40px",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "500px",
    color: "#fff",
    backgroundImage: `url(${background})`,
    display:"flex",
    flexDirection:"column"
  }
})


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/evalin123/repos')
      .then(response => {
        console.log(response.data)
        this.setState({ repos: response.data })
      })
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.repos)
    let list = this.state.repos.map(r => {
      return <div className={classes.article}>
        <label>Title : {r.name}</label>
        <label>Description : {r.description}</label>
        <label>URL : {r.html_url}</label>
        <label>Default Branch : {r.default_branch}</label>
      </div>
    })
    return (
      <div className={classes.main}>
        {list}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App);
