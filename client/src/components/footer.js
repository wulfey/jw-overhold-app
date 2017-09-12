import React from 'react';
import { Component} from 'react';


// more presentation component 
const Footer = ({
  store
}) => {
  return (
    <p>
      Show:
        {' '}
        <FilterLink
          store={store}
          filter='SHOW_ALL'

        >
          All 
        </FilterLink>

        {' '}
        <FilterLink
          store={store}
          filter='SHOW_ACTIVE'

        >
          Active 
        </FilterLink>

        {' '}
        <FilterLink
          store={store}
          filter='SHOW_COMPLETED'

        >
          Completed 
        </FilterLink>
    </p>
  )
  
}

// container, provides the data and the behavior
class FilterLink extends Component {
  componentDidMount(){
    // const {store} = this.context;
    // console.log("INDIXSE filterlink");

    this.unsubscribe = this.props.store.subscribe(() =>
       this.forceUpdate()
    )
    // console.log(this.context);
  }

  componentWillUnMount(){
    this.unsubscribe();
  }

  render(){
    // console.log("INDIXSE filterlink");
    // console.log(this.props);
    // console.log(this.contex);
    // console.log(this.props.store);

    const props = this.props;
    // const {store} = this.contex;
    // console.log(props.store.getState());
    // console.log(props.store);
    const state = this.props.store.getState();
    // console.log(`this is STATE for ${props.filter}:`);
    // console.log(state);
    // console.log(state.visibilityFilter);
    return(
      <Link
        active={
          props.filter === state.visibilityFilter
        }
        onClick={() =>
          this.props.store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>

    )
  }
}

FilterLink.contextTypes = {
  store: React.PropTypes.object
}


// only the appearance 
const Link = ({
  active,
  children,
  onClick
}) => {
  // the span there is an alternative to an <a href> it looks clean</a>
  if (active){ 
    return <span>{children}</span>
  }

  return (
    <a href='TodoDisplay'
      onClick= {e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  )
}


  

export default Footer;