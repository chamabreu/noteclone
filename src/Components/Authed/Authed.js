/* MODULES */
import { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'



/* Components */
import MainView from './MainView/MainView'
import SideBar from './SideBar/SideBar'



/* Other */
import { StateContext, DispatchContext } from '../../Context/StateManager'
import { API } from '../../Context/ApiCalls'
import { Col, Container, Row } from 'react-bootstrap'



/* The "main" Component if a user is authed */
export default function Authed() {
  /* get global Contexts */
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)



  useEffect(() => {
    /*
      check if there is data in the StateContext.
      if not, get some
    */
    if (!globalState.data) {
      API.getData()

        /* On success set global state with data */
        .then(result => {
          globalDispatch({ type: "SET_DATA", payload: result.data })
        })


        /* On failure, make sure to reset the global state to "log the user out" */
        .catch(error => {
          globalDispatch({ type: "RESET" })
          console.log('error :>> ', error)
        })
    }
  }, [globalState.data, globalDispatch])



  /* Let the user "wait for data" if there is no data */
  if (!globalState.data) {
    return (
      null
      // <h1>Waiting for Data</h1>
    )


    /* the normal case, show the page */
  } else {
    return (
      <Container>
        <Row>

          <Switch>

            {/* The "home" of the site */}
            <Route exact path="/">
              <Col>
                <SideBar />
              </Col>
              <Col>

                <MainView />
              </Col>
            </Route>


            {/* the specific page view */}
            <Route path="/:page">
              <Col>
                <SideBar />
              </Col>
              
              <Col>
                <MainView />
              </Col>
            </Route>


          </Switch>
        </Row>
      </Container>
    )

  }

}

