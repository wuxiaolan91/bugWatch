export default {
  changeProject(state, Object) {
    console.log('mutations', Object);
    state.projectId = Object.projectId;
  }
}