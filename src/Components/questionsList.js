import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import LifeDescriptor from './lifeDescriptor'
// import excersizes from '../store/reducers/exercizes'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
// import { getUser } from '../store/users/reducer'


 class QuestionsList extends Component {
  //  this.splittingArray = this.splittingArray.bind(this)
   async  componentDidMount(){
    const { dispatch, userId } = this.props;
       await dispatch(loadAllAnswersAC(userId));
       await dispatch(loadAllTransitionsAC(userId));
       await dispatch(loadAllStaticdataAC())
  }
  splittingArray(arr) {
    var size = 10;
    var arrayOfArrays = [];
    for (var i=0; i<arr.length; i+=size) {
        arrayOfArrays.push(arr.slice(i,i+size));
    }
    console.log('qwertyuihgfdcsfghj::::',arrayOfArrays)
    return arrayOfArrays
  }

  render(){
    const { lifeDescriptors,isLoading } = this.props
    console.log('LERROOYYYYYYYYY JENKINNNSSSSSS',lifeDescriptors);
    let pages = this.splittingArray(lifeDescriptors)

    let list =   pages.map((element) => (
      element.map(ele =>(
        <LifeDescriptor data= { ele }/>

      ))
    ))
    return(
      <>
        <p>{((isLoading) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
          {list}
          </>
        )}
      </>
    )
  }
}


// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  return {
    isLoading: state.answersRD.isLoading || state.staticdataRD.isLoading,
    userId: 1,
    lifeDescriptors: state.staticdataRD.lifedescrs
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionsList)
