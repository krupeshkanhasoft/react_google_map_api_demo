// Create componet for genearte options in dropdown
export default {

    ProjectsAutoComplete(self) {
        var Option = []
        
        if (self.state.allprojects) {
            for (var i = 0; i < self.state.allprojects.length; i++) {
                Option.push({ value: self.state.allprojects[i], label: self.state.allprojects[i] })
            }
        }

        return Option
    },

    DeviceAutoComplete(self) {
        var Option = []

        if (self.state.alldevices) {
            for (var i = 0; i < self.state.alldevices.length; i++) {
                Option.push({ value: self.state.alldevices[i], label: self.state.alldevices[i] })
            }
        }

        return Option
    }
}