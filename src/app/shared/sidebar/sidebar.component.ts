import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUserInfo()
  }
  
  public user:any
  private getUserInfo(){
    this.userService.getUserInfo().subscribe((data) => {
    this.user = data
  })
  }
}
