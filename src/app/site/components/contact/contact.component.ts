import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth'
import { DatePipe } from '@angular/common';
import { CommentService } from '../../services/comment.service'
import 'rxjs/add/operator/filter';

@Component({
  selector: 'ngx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  user: any;
  role: string = "guest";
  checkAuth: boolean = false;
  comments: any;
  newComment: string = '';
  constructor(
    private authService: NbAuthService,
    private datePipe: DatePipe,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
          this.checkAuth = true;
          this.role = this.user['data'].role;
          this.user['data'].jwt = token.getValue();
        }
      });

    // Fetch all comments from visitor table
    this.commentService.getAllComment().subscribe(
      data => {
        // Get all comments of visitors if no one auth
        if (this.user == null) {
          this.comments = data.data;
        }
        // Get only comments of this user
        else {
          this.comments = data.data.filter((n) => {
            return n.id == this.user['data'].id ? n : null;
          });
        }
      }, // this should happen on success
      error => console.log(error));
  }

  onSubmit() {
    this.user['data'].modified = this.datePipe.transform(new Date(), "yyyy-M-dd hh:mm:ss") // "2019-05-22:02:08"
    this.user['data'].comment = this.newComment;
    this.commentService.addComment(this.user['data']).subscribe((res) => {
      if (res['status'])
        this.ngOnInit();
    });
  }
}
