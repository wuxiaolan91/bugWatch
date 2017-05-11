const mutationObj = {
  changeProject: function(state, Object) {
    state.projectId = Object._id || Object.projectId;
    if (Object.projectName) state.projectName = Object.projectName
  },
  getProjectList: function(state, List) {
    state.projectList = List;
    if (List.length) {
      state.projectId = List[0]._id;
    }
  },
  addProject: function(state, Object) {
    state.projectList.push(Object);
    state.projectId = Object._id;
    state.projectName = Object.name;
  },
  deleteProject: function(state, Object) {

    state.projectList.splice(state.projectList.indexOf(Object), 1);
    if (Object._id == state.projectId) { // 如果删的是当前active的项目
      state.projectId = state.projectList.length ? state.projectList[0]._id : '';
    }
  },
};
export default mutationObj;
