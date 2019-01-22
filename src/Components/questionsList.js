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
   async  componentDidMount(){
    const { dispatch, userId } = this.props;
       await dispatch(loadAllAnswersAC(userId));
       await dispatch(loadAllTransitionsAC(userId));
       await dispatch(loadAllStaticdataAC())
  }

  render(){
    const { lifeDescriptors,isLoading } = this.props
    console.log('LERROOYYYYYYYYY JENKINNNSSSSSS',lifeDescriptors);
    let list =   lifeDescriptors.map((element) => (

       <LifeDescriptor data= { element }/>
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
