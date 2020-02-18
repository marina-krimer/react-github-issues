import React, {Component} from 'react'
import Loader from './loader/Loader'
import LogOn from './LogOn'
import IssuesTable from './IssuesTable'
import _ from 'lodash'
import DetailIssueView from './DetailIssueView'
import Modal from 'react-modal'

Modal.setAppElement('#modal-root')

const ModalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class GithubIssues extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        rowCount: '10',
        rowCounts: ["10", "20", "30"],
        loading: false,
        LogOnUser: {name: "LogOnUser", value: "", placeholder: "Имя пользователя"},
        LogOnRepository: {name: "LogOnRepository", value: "", placeholder: "Название репозитория"},
        error: "",
        emptySelectValue: '-- не задано --',
        repositories: false,
        issues: false,
        sort: 'asc',  // 'desc'
        sortField: 'number', // поле по умолчанию
        row: {},
        showModal: false,
        currentPage: 0,
        needRepos: false,
        needIssues: false,
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleUserSubmit = this.handleUserSubmit.bind(this)
    this.handleRepositoriesChange = this.handleRepositoriesChange.bind(this)
    this.onSort = this.onSort.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this) 
    this.onCloseModal = this.onCloseModal.bind(this) 
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleRowCountChange = this.handleRowCountChange.bind(this)
    
  }

  

  async fetchToJson (url, params) {  
    let responseCheckStatus = async (response) => {
            if (response.status !== 200 && !response.ok) {
            return Promise.reject(new Error(response.statusText))
            }
            return Promise.resolve(response)
        }

    let responseToJson = async (response) => {
            return response.json()
        }
        

        return fetch(url, params /*params  -  {method: 'post', body: 'test=1'}*/)
            .then(responseCheckStatus)
            .then(responseToJson)

  }


  async getUserRepositories(userName) {
    if (userName.length>0) {
      this.setState({loading: true, needRepos: true})
      this.fetchToJson('https://api.github.com/users/'+userName+'/repos')
      .then((response) => {
        this.setState({  
                  repositories: response,
                  loading: false,
                  needRepos: false
                })
      })
      .catch( (error) => {
        this.setState({ error: "Ошибка: " + error,
                  loading: false,
                  needRepos: false})
                   console.log(this.state.error)
      })
  }
  }

  
  handleUserChange = event => { 
  event.preventDefault()
  this.onFieldChange(event)  
  }

  handleUserSubmit = event => { 
    event.preventDefault()
    this.setDefaultReposStates()
    this.getUserRepositories(this.state.LogOnUser.value)
    }



  setDefaultReposStates = () => {
    this.setState({repositories: false,
      issues: false})
    this.setState(prevState => {
      const name = "LogOnRepository"
      const updatedField = prevState[name]
      updatedField.value = this.state.emptySelectValue
      return {[name] : updatedField }
    })
  }


  handleRepositoriesChange = event => {
    event.preventDefault()
    this.setState({issues: false})
    this.onFieldChange(event)
    const {value} = event.target
    this.getIssues(value)
   
  }

  handleRowCountChange = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value });
  }

  onFieldChange = event => {
        const {name, value, type} = event.target
        if (event.target.type === "text" || event.target.type === "select-one") 
        { this.setState(prevState => {
                            const updatedField = prevState[name]
                            updatedField.value = value
                            return {
                                [name] : updatedField
                        }
                    })
        
        }
        else {this.setState({ [event.target.name]: event.target.value });}
  }

  setIssues = (response) => {
    let data = response.map((item, idx) =>{
        return {id: item.id, 
                number: item.number, 
                title: item.title, 
                created_at: item.created_at, 
                login: item.user.login, 
                avatar_url: item.user.avatar_url, 
                html_url: item.user.html_url
               }           
        })
    this.setState({issues: _.orderBy(data, this.state.sortField, this.state.sort),
                  loading: false, needIssues: false})
  }

  async getIssues(repositoryName) {
    const userName = this.state.LogOnUser.value

    if (userName.length>0 && repositoryName.length>0 && repositoryName!=this.state.emptySelectValue)
    { 
      this.setState({loading: true, needIssues: true})
      this.fetchToJson("https://api.github.com/repos/"
                        +userName+"/"+repositoryName+"/issues"
                      )
      .then((response) => { 
        this.setIssues(response)
      })
      .catch( (error) => {
        this.setState({ error: "Ошибка: " + error,
                  loading: false, needIssues: false})
                   console.log(this.state.error)
      }) 
    }
  }


onSort = sortField => {
  const cloneIssues = this.state.issues.concat()
  const sortType = this.state.sort === 'asc' ? 'desc' : 'asc'
  const orderedData = _.orderBy(cloneIssues, sortField, sortType)
  this.setState({
    issues: orderedData,
    sort: sortType,
    sortField
  })
}

onOpenModal = row => {
  this.setState({
    row,
    showModal: true  
  })
}


onCloseModal = () => {
  this.setState({showModal: false})
}

showDetailView = () => {
  return (
    <div>
      <React.Fragment>
        { this.state.showModal && 
          (<Modal 
            isOpen={this.state.showModal}
            onRequestClose={this.onCloseModal}
            contentLabel="Пользователь"
           > 
            <DetailIssueView issue={this.state.row} />
          </Modal>)
        }
      </React.Fragment>
    </div>
  )  
}

handlePageChange = ({selected}) => {
  this.setState({currentPage: selected})
}

  render() {
    return (
        <div>
            {/* поля ввода пользователя и репозитория */}
            <LogOn
                  onUserChange = {this.handleUserChange}
                  onUserSubmit = {this.handleUserSubmit}
                  onRepositoriesChange = {this.handleRepositoriesChange}
                  data = {this.state}
            /> 

            {/* загрузка сообщения "Идет загрузка данных"*/}
            {this.state.loading ?
              <Loader /> 
              : 
              null
            }

            {/* загрузка таблицы обращений пользователя */}
            {(!this.state.loading && 
              !this.state.needRepos &&
              !this.state.needIssues && 
              this.state.LogOnUser.value.length>0 &&
              this.state.LogOnRepository.value.length>0 &&
              this.state.issues) ?
              <React.Fragment>
                  <IssuesTable 
                        issues = {this.state.issues}
                        rowCount = {this.state.rowCount}
                        rowCounts = {this.state.rowCounts}
                        onRowCountChange = {this.handleRowCountChange}
                        onSort = {this.onSort}
                        sort = {this.state.sort}
                        sortField = {this.state.sortField}
                        onOpenModal={this.onOpenModal}  
                        onPageChange = {this.handlePageChange} 
                        currentPage={this.state.currentPage} 
                  />
              </React.Fragment> 
             :
             null   
            } 
            
            {/* просмотр окна данных пользователя */}
            { this.state.showModal ? 
              (
                <Modal 
                    isOpen={this.state.showModal}
                    onRequestClose={this.onCloseModal}
                    contentLabel={"Пользователь"}
                    style={ModalStyles}
                  > 
                    <DetailIssueView issue={this.state.row} onClose={this.onCloseModal}/>
                </Modal>
              )  
            : null 
            }
            
        </div>  

    )
  }
}

export default GithubIssues