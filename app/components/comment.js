import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeFeedItemComment} from '../server';
import {unlikeFeedItemComment} from '../server';

export default class Comment extends React.Component {

  constructor(props){
       super(props);
       this.state = props.data
  }

    handleLikeClick(clickEvent) {
      clickEvent.preventDefault();

      if(clickEvent.button === 0){
        var callbackFunction = (updatedLikeCounter) => {
          this.setState({likeCounter: updatedLikeCounter});
        };
        if(this.didUserLiked()) {
          // User clicked 'unlike' button.
          unlikeFeedItemComment(this.props.index,this.props.stateId, 4, callbackFunction);
        }
        else {
          // User clicked 'like' button.
          likeFeedItemComment(this.props.index,this.props.stateId,4,callbackFunction);
        }
      }
    }

    didUserLiked() {
      var likeCounter = this.state.likeCounter;
      var liked = false;
      // Look for a likeCounter entry with userId 4 -- which is the
      // current user.
      for (var i=0 ;i <likeCounter.length; i++) {
        if(likeCounter[i]._id === 4) {
          liked = true;
          break;
        }
      }

      return liked;

    }


  render() {

    var likeButtonText = "Like";
        if(this.didUserLiked()){
        likeButtonText = "Unlike";
     }

    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link>{' ' + this.props.children}
             <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{likeButtonText}</a> · <a href="#">Reply</a> ·
                <a href="#">{' ' + this.state.likeCounter.length} people likes this</a> ·
               {' ' + unixTimeToString(this.props.postDate)}
           </div>
      </div>
    )
  }
}
