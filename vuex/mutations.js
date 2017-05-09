let mutations =  {
  changeProject (state, Object) {
    state.projectId = Object.projectId;
  },
  getProjectList (state,List) {
    state.projectList = List;
    if (List.length) {
      state.projectId = List[0]._id;
    }
  },
  addProject (state, Object) {
    state.projectList.push(Object);
    state.projectId = Object._id;
    state.projectName = Object.name;
  },
  deleteProject (state, Object) {
    
    state.projectList.splice(state.projectList.indexOf(Object), 1);
    if (Object._id == state.projectId) { // 如果删的是当前active的项目
      state.projectId = state.projectList.length ? state.projectList[0]._id : '';
    }
  }
}
  ;
  export default mutations;