/*
    E.g:
    {
        name : 'decline',   // unique state name
        onStart : true,     // object will have this state on start (unique)
        beforeFn : 'initDecline', // method to execute before state changes
        updateFn : 'updateDecline', // update method for this state
        sprite : {
            frame : 0   // show this frame on this state
            frames : [1, 10] // play frames 1 - 10 on this state
        }
    },

*/
var StateManager = function(states) {

    if (!states) {
        throw "YUNO give me states?? Sincerly, the StateManager";
    }

    this.states = states;
    
    this.defaultState = this.findByProperty('onStart', true);
    this.currentState = this.defaultState;
};

StateManager.prototype.change = function(_stateName) {
    this.currentState = this.findByProperty('name', _stateName);

    if (!this.currentState) {
        throw "Could not find state by name: " + _stateName;
    }
};

// Finds a state by property, value and returns { state }
StateManager.prototype.findByProperty = function(property, value) {
    
    var state = this.traverseStates(function(state) {

        if (state.hasOwnProperty(property)) {

            if (state[property] === value) {
                return state;
            }
        }
        
    });

    return state;
};

StateManager.prototype.traverseStates = function(callback) {

    var i = 0,
        len = this.states.length;    

    for (var i = 0; i < len; i++) {

        if (callback.call(this, this.states[i])) {

            return this.states[i];

        };

    };

};