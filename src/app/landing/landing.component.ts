import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

const DIRECT_ACCESS_PATHS = [ "blog", "projects", "about" ];

export interface LandingQuery {
    direct: string;
}

@Component({
    selector: "landing",
    styleUrls: [ "./landing.scss" ],
    templateUrl: "./landing.html"
})
export class LandingComponent implements OnInit {
    direct: string;
    show404: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.direct = (this.route.snapshot.queryParams as LandingQuery).direct;
        if (DIRECT_ACCESS_PATHS.indexOf(this.direct) !== -1) {
            this.router.navigate([ `/${this.direct}` ]);
        } else {
            this.router.navigate([ "/blog" ]);
        }
    }
}