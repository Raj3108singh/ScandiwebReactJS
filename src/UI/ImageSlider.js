
import React from 'react'
import './ImageSlider.css'


class ImageSlider extends React.Component {
constructor(props){
  super(props);
  this.state={
    current : 0
  }
  this.length = this.props.gallery.length;
}

previousSlide(){
  this.setState({
    current :  this.state.current === 0 ? this.length-1 : this.state.current - 1 
  }) 
  
}

nextSlide(){
  this.setState({
    current :  this.state.current === this.length - 1 ? 0 : this.state.current + 1 
  })

}

render(){
  
  return(
    <div className='slider-container'>
        <div>           
            <img  src= {`${this.props.gallery[this.state.current]}`} alt=""/>
        </div>   
       <div className='container--slider' > 
          <div className='arrow-container' onClick={this.previousSlide.bind(this)}>
              <img src='/images/Rectangle.png' alt='' ></img>
              <img src='/images/leftarrow.png' alt=''  className='arrow-slider-left'></img>
          </div>

          <div className='arrow-container' onClick={this.nextSlide.bind(this)}>
              <img src='/images/Rectangle.png' alt=" " ></img>
              <img src='/images/arrow.png'  alt="" className='arrow-slider-right'></img>
         </div> 
        </div>  
    </div>

  )
}
}


export default ImageSlider


