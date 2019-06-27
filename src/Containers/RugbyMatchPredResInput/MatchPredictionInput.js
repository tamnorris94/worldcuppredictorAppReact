// import React, { Component } from 'react';
// import Aux from '../../Hoc/Auxiliary/Auxiliary';
// import { Button, Form, FormGroup, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import classes from './MatchPredictionInput.css'
//
// class MatchPredictionInput extends Component {
//
//     state = {
//         teamSelection: {
//             teamAName: {
//                 elementType: 'button',
//                 label: 'Mountaineers',
//                 selected: "true"
//             },
//             teamBName: {
//                 elementType: 'button',
//                 label: 'Warriors',
//                 selected: true
//             }
//         },
//         selectedmargin: "",
//         selectedteam: "",
//         canSubmitForm: false,
//         rSelected: ""
//     }
//
//     onRadioBtnClick(rSelected) {
//         this.setState({ rSelected });
//     }
//
//     setWinningTeamHandler(winningTeam){
//         console.log("Set winning team clicked. Winning team is " +winningTeam);
//     }
//
//     setWinningMargin(winningMargin){
//         console.log("The winning margin selected is " + winningMargin);
//     }
//
//     render(){
//
//         const marginSelectionControls = [
//             { label: '21+', type: '21plus' },
//             { label: '16-20', type: '16to20' },
//             { label: '11-15', type: '11to15' },
//             { label: '6-10', type: '6to10' },
//             { label: '1-5', type: '1to5' }
//         ];
//
//         const formElementsArray = [];
//         for (let key in this.state.teamSelection) {
//             formElementsArray.push({
//                 id: key,
//                 config: this.state.teamSelection[key]
//             });
//         }
//
//         let matchResultInputForm = <p>This is match result input form</p>;
//
//         // matchResultInputForm = (
//         //     <form>
//         //         <div>
//         //             {formElementsArray.map(formElement => (
//         //                 <div key={formElement.id} className="btn-group" role="group" aria-label="Basic Example">
//         //                     <TeamSelectionControl selected={formElement.config.selected}
//         //                                           selectTeam={(event)=>this.setWinningTeamHandler(formElement.config.label)}
//         //                                           selectedteam={this.state.selectedteam}>
//         //                         {formElement.config.label}
//         //                     </TeamSelectionControl><br/>
//         //                 </div>
//         //             ))}
//         //         </div>
//         //         <MarginSelectionControls/>
//         //    </form>
//         // );
//
//         //There is something wrong with having all the MarginSelectionControls in one row and column. This should be
//         // a row for each.
//
//         // matchResultInputForm = (
//         //     <Form className="login-form">
//         //         <h3>This is my bootstrap app</h3>
//         //             <Row>
//         //                 <Col>
//         //                     <TeamSelectionControl>{this.state.teamSelection.teamAName.label}</TeamSelectionControl>
//         //                 </Col>
//         //                 <Col xs={0.5}>@</Col>
//         //                 <Col>
//         //                     <TeamSelectionControl>{this.state.teamSelection.teamBName.label}</TeamSelectionControl>
//         //                 </Col>
//         //             </Row>
//         //             <MarginSelectionControls/>
//         //         <div>
//         //             <h5>Radio Buttons</h5>
//         //             <ButtonGroup>
//         //                 <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>One</Button>
//         //                 <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Two</Button>
//         //                 <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Three</Button>
//         //             </ButtonGroup>
//         //             <p>Selected: {this.state.rSelected}</p>
//         //         </div>
//         //     </Form> );
//
//         matchResultInputForm = (
//             <Form >
//                 <Container fluid>
//                     <Row>
//                         <Col lg={true}>
//                             <h3 align="center">This is my bootstrap app</h3>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                         <ButtonGroup className="d-flex">
//                             {formElementsArray.map(formElement => (
//                                     <Button
//                                         key={formElement.id}
//                                         className="btn-block mr-1 mt-1 btn-lg"
//                                         color="primary"
//                                         onClick={(event) => this.setWinningTeamHandler(formElement.config.label)}
//                                         block
//                                         label={formElement.config.label}
//                                         selectedteam={this.state.selectedteam}>{formElement.config.label}</Button>
//
//                             ))}
//                         </ButtonGroup>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                             <div className="btn-group d-flex mt-1 btn-group-vertical" role="group">
//                                 {marginSelectionControls.map( ctrl => (
//                                             <Button
//                                                 className="btn-block mr-1 mt-1 btn-lg"
//                                                 key={ctrl.label}
//                                                 onClick={(event) => this.setWinningMargin(ctrl.label)}
//                                                 label={ctrl.label}
//                                             >{ctrl.label}</Button>
//
//                                 ))}
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </Form> );
//
//         return (
//             <Aux>
//                 {matchResultInputForm}
//             </Aux>
//         );
//     };
// }
//
// export default MatchPredictionInput;