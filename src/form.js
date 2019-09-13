// Create componet fon change event of dropdown
export default{
  
  ProjectsChange : function(val,self){
   
   let dev = []
    for(var i =0 ;i<self.state.locationscity.length;i++){
      for(var k = 0;k < self.state.locationscity[i].projects.length;k++){
          if(self.state.locationscity[i].projects[k].project == val.value){
            dev = self.state.locationscity[i].projects[k].devices;
          }

      }
             
    }
    var dev1 = []
     for(var i =0 ;i<dev.length;i++){
      dev1.push(dev[i].name)
   }
    self.setState({
      specificproject:val.value,
      specificdevice:null,
      alldevices:dev1
    })

  },
  DeviceChange(val,self){
   
    self.setState({
      specificdevice:val.value,
     
    })
  },
  
}