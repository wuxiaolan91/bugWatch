let userInfo = localStorage.getItem('userInfo');
if (userInfo) {
  userInfo = JSON.parse(userInfo)
} else {
  userInfo = {};
}
export default {
  title: 'bugWatch~',
  companyId: '',
  projectId: localStorage.getItem('projectId') || '',
  projectName: '',
  projectList: [
  ],
  user: {
    gradeId: userInfo.gradeId || '' // 当前用户在公司里的gradeId 1不能添加项目。 2.可以添加项目和用户 3all。
  },
  company: {
    companyId: '', // 公司id
    companyName: '',
    ownerId: '', // 公司拥有者
    ownerName: '',
    userList: [] // 这个公司的用户列表
  }
}