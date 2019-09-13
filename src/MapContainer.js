import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactHighcharts from 'react-highcharts'
import Row from "./row.js"
import FormHelper from "./form.js"
import ReducerRenderHelper from "./render.js"

import Select from 'react-select'
const customStyles = {
 
};
export default class MapContainer extends Component {

  // ======================
  // ADD LOCATIONS TO STATE
  // ======================
constructor() {
    super();
    // Assume thate we are getting data from API(Backend)
    this.state = {
      locations: [
        { id:1,name: "New York County Supreme Court", location: {lat: 40.7143033, lng: -74.0036919},completionratio:30,numberOfDevice:5,topProjects:"A,B,C" },
        { id:2,name: "Queens County Supreme Court", location: {lat: 40.7046946, lng: -73.8091145},completionratio:60,numberOfDevice:4,topProjects:"A1,B1,C1"  },
        { id:3,name: "Kings County Supreme Court", location: {lat: 40.6940226, lng: -73.9890967},completionratio:85,numberOfDevice:8,topProjects:"A2,B2,C2" },
        { id:4,name: "Richmond County Supreme Court", location: {lat: 40.6412336, lng: -74.0768597},completionratio:100,numberOfDevice:7,topProjects:"A3,B3,C3" },
        { id:5,name: "Bronx Supreme Court", location: {lat: 40.8262388, lng: -73.9235238},completionratio:100,numberOfDevice:3,topProjects:"A4,B4,C4"  }
        ],
      locationscity: [
        { id:1,County:"A",projects:[{project:"A",totalCompleteRatio:10,devices:[{name:"Device AA",step:"Data Entry AA",complete:"50%"},{name:"Device AB",step:"Document Review AB",complete:"70%"},{name:"Device AC",step:"Prepare To Lunch AC",complete:"90%"}]},{project:"B",totalCompleteRatio:50,devices:[{name:"Device BA",step:"Data Entry BA",complete:"50%"},{name:"Device BB",step:"Document Review BB",complete:"70%"},{name:"Device BC",step:"Prepare To Lunch BC",complete:"90%"}]},{project:"C",totalCompleteRatio:25,devices:[{name:"Device CA",step:"Data Entry CA",complete:"50%"},{name:"Device CB",step:"Document Review CB",complete:"70%"},{name:"Device CC",step:"Prepare To Lunch CC",complete:"90%"}]} ]},
        { id:2,County:"B",projects:[{project:"A1",totalCompleteRatio:20,devices:[{name:"Device AA1",step:"Data Entry AA1",complete:"50%"},{name:"Device AB1",step:"Document Review AB1",complete:"70%"},{name:"Device AC1",step:"Prepare To Lunch AC1",complete:"90%"}]},{project:"B1",totalCompleteRatio:40,devices:[{name:"Device BA1",step:"Data Entry BA1",complete:"50%"},{name:"Device BB1",step:"Document Review BB1",complete:"70%"},{name:"Device BC1",step:"Prepare To Lunch BC1",complete:"90%"}]},{project:"C1",totalCompleteRatio:35,devices:[{name:"Device CA1",step:"Data Entry CA1",complete:"50%"},{name:"Device CB1",step:"Document Review CB1",complete:"70%"},{name:"Device CC1",step:"Prepare To Lunch CC1",complete:"90%"}]} ]},
        { id:3,County:"C",projects:[{project:"A2",totalCompleteRatio:30,devices:[{name:"Device AA2",step:"Data Entry AA2",complete:"50%"},{name:"Device AB2",step:"Document Review AB2",complete:"70%"},{name:"Device AC2",step:"Prepare To Lunch AC2",complete:"90%"}]},{project:"B2",totalCompleteRatio:30,devices:[{name:"Device BA2",step:"Data Entry BA2",complete:"50%"},{name:"Device BB2",step:"Document Review BB2",complete:"70%"},{name:"Device BC2",step:"Prepare To Lunch BC2",complete:"90%"}]},{project:"C2",totalCompleteRatio:75,devices:[{name:"Device CA2",step:"Data Entry CA2",complete:"50%"},{name:"Device CB2",step:"Document Review CB2",complete:"70%"},{name:"Device CC2",step:"Prepare To Lunch CC2",complete:"90%"}]} ]},
        { id:4,County:"D",projects:[{project:"A3",totalCompleteRatio:40,devices:[{name:"Device AA3",step:"Data Entry AA3",complete:"50%"},{name:"Device AB3",step:"Document Review AB3",complete:"70%"},{name:"Device AC3",step:"Prepare To Lunch AC3",complete:"90%"}]},{project:"B3",totalCompleteRatio:20,devices:[{name:"Device BA3",step:"Data Entry BA3",complete:"50%"},{name:"Device BB3",step:"Document Review BB3",complete:"70%"},{name:"Device BC3",step:"Prepare To Lunch BC3",complete:"90%"}]},{project:"C3",totalCompleteRatio:15,devices:[{name:"Device CA3",step:"Data Entry CA3",complete:"50%"},{name:"Device CB3",step:"Document Review CB3",complete:"70%"},{name:"Device CC3",step:"Prepare To Lunch CC3",complete:"90%"}]} ]},
        { id:5,County:"E",projects:[{project:"A4",totalCompleteRatio:50,devices:[{name:"Device AA4",step:"Data Entry AA4",complete:"50%"},{name:"Device AB4",step:"Document Review AB4",complete:"70%"},{name:"Device AC4",step:"Prepare To Lunch AC4",complete:"90%"}]},{project:"B4",totalCompleteRatio:10,devices:[{name:"Device BA4",step:"Data Entry BA4",complete:"50%"},{name:"Device BB4",step:"Document Review BB4",complete:"70%"},{name:"Device BC4",step:"Prepare To Lunch BC4",complete:"90%"}]},{project:"C4",totalCompleteRatio:5,devices:[{name:"Device CA4",step:"Data Entry CA4",complete:"50%"},{name:"Device CB4",step:"Document Review CB4",complete:"70%"},{name:"Device CC4",step:"Prepare To Lunch CC4",complete:"90%"}]} ]}
        
        ],
        modalIsOpen: false,
        cityname:"",
        projects:"",
        allprojects:[],
        alldevices:[], 
        specificdevice:"",
        specificproject:"",
        config : {
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
          }]
        }

    };
 
 
 
   
   
    this.__TogglePopUPModal__ = this.__TogglePopUPModal__.bind(this)
    this.__RenderRecord__ = this.__RenderRecord__.bind(this)     
  }

  __TogglePopUPModal__() {
      this.setState({
        modalIsOpen : !this.state.modalIsOpen,
      })
  }

 
  
  componentDidMount() {  
    this.loadMap(); // call loadMap function to load the google map
  }
  
  // Render rows in table in pop up
  __RenderRecord__() {  
    if(this.state.specificproject){
     var projectid = this.state.specificproject;
       var deviceid = this.state.specificdevice;
     let dev = []
     for(var i =0 ;i<this.state.locationscity.length;i++){
        for(var k = 0;k < this.state.locationscity[i].projects.length;k++){
          if(this.state.locationscity[i].projects[k].project == projectid){
            dev = this.state.locationscity[i].projects[k].devices;
          }
        }             
      }
      // set jsk as object for genrate rows
      var jsx = [];      
      for(var i =0 ;i<dev.length;i++){
        if(deviceid){
          if (dev[i].name == deviceid){
             jsx.push(<Row data = {dev[i]} self={this}/>)   
          }
        } else{
           jsx.push(<Row data = {dev[i]} self={this}/>)
        }
      }

      return jsx
    }
  }

  loadMap() {

      if (this.props && this.props.google) { // checks to make sure that props have been passed
          const {
              google
          } = this.props; // sets props equal to google
          const maps = google.maps; // sets maps to google maps props

          const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
          const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

          const mapConfig = Object.assign({}, {
              center: {
                  lat: 40.7485722,
                  lng: -74.0068633
              }, // sets center of google map to NYC.
              zoom: 11, // sets zoom. Lower numbers are zoomed further out.
              mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
          })

          this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

          // ==================
          // ADD MARKERS TO MAP
          // ==================
          this.state.locations.forEach(location => { // iterate through locations saved in state
              // Marker image based on our condition of completion
              let color = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              if (location.completionratio >= 0 && location.completionratio <= 50) {
                  color = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              } else if (location.completionratio >= 51 && location.completionratio <= 80) {
                  color = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
              } else if (location.completionratio >= 81 && location.completionratio <= 99) {
                  color = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              } else if (location.completionratio == 100) {
                  color = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              }

              // set detail in state ,when click on marker of particular city
              let locationdum = []
              this.state.locationscity.map((val, key) => {

                  if (val["id"] == location.id) {

                      locationdum = val
                      return false;
                  }

              });

              const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
                  position: {
                      lat: location.location.lat,
                      lng: location.location.lng
                  }, // sets position of marker to specified location
                  icon: color, // Based on conditions
                  id: location.id, // set id for particular city
                  map: this.map, // sets markers to appear on the map we just created on line 35
                  title: location.name, // set name
                  completionratio: location.completionratio,
                  numberOfDevice: location.numberOfDevice,
                  topProjects: location.topProjects,
                  locationcity: locationdum,
                  satedata: this

              });
              // Generral detail of particular information
              let str = "city:-" + location.name + "</br>completeRatio:- " + location.completionratio + "%</br>numberOfDevice:- " + location.numberOfDevice + "</br>topProjects:- " + location.topProjects
              var infowindow = new google.maps.InfoWindow({
                  content: str
              });
              // Add event when user click on marker
              google.maps.event.addDomListener(marker, 'click', function(event) {

                  var categories = []
                  var data = []
                  var Option = []
                  for (var i = 0; i < marker.locationcity.projects.length; i++) {
                      Option.push(
                          marker.locationcity.projects[i].project
                      )
                      categories.push(marker.locationcity.projects[i].project)

                      data.push(marker.locationcity.projects[i].totalCompleteRatio)
                  }

                  // for High chart and other necesary details
                  this.satedata.setState({
                      modalIsOpen: true,
                      cityname: marker.title,
                      allprojects: Option,
                      config: {
                          yAxis: {
                              title: {
                                  text: 'Percentage'
                              }
                          },
                          xAxis: {

                              categories
                          },
                          title: {
                              text: 'Complete Ratio of Projects'
                          },
                          series: [{
                              name: 'Projects',
                              data
                          }]
                      }
                  });
              });
              // when mouse out info window close
              google.maps.event.addDomListener(marker, 'mouseout', function() {

                  infowindow.close()

              });
              // when mouse over info window open with particlur city data
              google.maps.event.addDomListener(marker, 'mouseover', function() {
                  let str = "city:-" + marker.title + "</br>completeRatio:- " + marker.completionratio + "%</br>numberOfDevice:- " + marker.numberOfDevice + "</br>topProjects:- " + marker.topProjects
                  infowindow.setContent(str);
                  infowindow.open(this.map, marker)

              });
               // when close click info window close
              google.maps.event.addListener(infowindow, 'closeclick', function() {
                  infowindow.setContent('');
              });
          })

      }
  }
 
  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '90vw', // 90vw basically means take up 90% of the width screen. px also works.
      height: '75vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
       <div>
          <div ref="map" style={style}>
              <Modal isOpen={this.state.modalIsOpen} toggle={this.__TogglePopUPModal__}>
                  <ModalHeader toggle={this.__TogglePopUPModal__}>Detail of {this.state.cityname}</ModalHeader>
                  <ModalBody>
                      <div className="card-block">
                          <div>
                              <ReactHighcharts config={ this.state.config} domProps={ {id: 'chartId'}}></ReactHighcharts>
                          </div>
                          <div>
                              <div className={ "form-group "}>
                                  <label htmlFor="Tag">Projects</label>
                                  <Select value={ this.state.specificproject} multi={false} placeholder={ "Select Projects"} ignoreCase={ true} onChange={(val)=>FormHelper.ProjectsChange(val,this)} options={ReducerRenderHelper.ProjectsAutoComplete(this)} />
                              </div>
                              <div className={ "form-group "}>
                                  <label htmlFor="Tag">Devices</label>
                                  <Select value={ this.state.specificdevice} multi={false} placeholder={ "Select Devices"} ignoreCase={ true} onChange={(val)=>FormHelper.DeviceChange(val,this)} options={ReducerRenderHelper.DeviceAutoComplete(this)} />
                              </div>
                              <div className={ "form-group "}>
                                  <table className="table table-bordered table-striped table-condensed">
                                      <thead>
                                          <tr>
                                              <th>Name</th>
                                              <th>Step</th>
                                              <th>Complete</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {this.__RenderRecord__()}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="secondary" onClick={this.__TogglePopUPModal__}>Cancel</Button>
                  </ModalFooter>
              </Modal>
              loading map...
          </div>
      </div>
    )
  }
}