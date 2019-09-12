import React from 'react'





class About extends React.Component{

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    return(
      <container>
        <section className="hero_light">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third is-centered">
              </div>
              <div className="column is-one-third">
                <img width="400" src="http://mberezzatomanerba.it/wp-content/uploads/2016/04/MBE-Logo-Vertical_Negativo-Convertito.png"/>
              </div>
              <div className="column is-one-third">
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <h1 className="title has-text-centered has-text-danger"><img width="200" src="https://www.seekpng.com/png/detail/171-1714311_mail-boxes-etc-logo-png-transparent-mbe-logo.png" alt="logo"/><br/>About Mail Boxes Etc</h1>

            <hr/>
            <h2 className="subtitle has-text-centered has-text-danger">Services shop at Your service</h2>

            <h4 className="subtitle has-text-centered">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </h4>
            <div className="container">

              <hr/>
              <h2 className="subtitle has-text-centered has-text-danger">
              The Mail Recorder
              </h2>
              <h4 className="subtitle has-text-centered">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h4>
              <div>
                <hr/>
                <h2 className="subtitle has-text-centered has-text-danger">
                Our policy
                </h2>
                <h4 className="subtitle has-text-centered">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  <ul>
                    <li>whether the website conducts sales</li>
                    <li>whether the website has further policies</li>
                  </ul>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h4>
              </div>
            </div>
          </div>

        </section>
      </container>
    )
  }
}

export default About
