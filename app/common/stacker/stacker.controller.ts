export interface StackerPositionStyle {
    top: string;
    left: string;
}

export class StackerController {
    itemCount: number;
    columns: number[];
    itemWidth: number;
    items: angular.IAugmentedJQuery[] = [];

    /* @ngInject */
    constructor(private $element: angular.IAugmentedJQuery, private $scope: angular.IScope,
                private $window: angular.IWindowService) {}

    $onInit(): void { this.$element.addClass("stacker"); }

    addItem(item: angular.IAugmentedJQuery): void {
        this.items.push(item);
        if ((this.itemCount && this.items.length === this.itemCount) ||
            (!this.itemCount && this.items.length === 1)) {
            this.setWatchers();
        }
    }

    arrangeContents = (): void => {
        this.initializeColumns();
        this.items.forEach(this.arrangeItem);
    };

    private arrangeItem = (item): void => {
        let shortIndex = this.findShortColumn();
        item.css("top", `${this.columns[shortIndex]}px`);
        item.css("left", `${this.itemWidth * shortIndex}px`);
        this.columns[shortIndex] += item[0].offsetHeight;
    };

    private initializeColumns = (): void => {
        this.columns = [];
        let totalWidth = this.$element[0].offsetWidth;
        this.itemWidth = this.items[0][0].offsetWidth;
        // offsetWidth is always an integer. Squeezing in a column that is 0.5px too big is
        // not likely to cause problems, but configuring two columns when there is nearly room for
        // three looks bad.  Subtracting 0.5px from offsetWidth prevents this.
        let columnCount = Math.max(Math.floor(totalWidth / (this.itemWidth - 0.5)), 1);
        for (let k = 0; k < columnCount; k ++) {
            this.columns.push(0);
        }
    };

    private findShortColumn = (): number => {
        let shortValue = 1e9;
        let shortIndex = 0;
        this.columns.forEach((column: number, index: number) => {
            if (column < shortValue) {
                shortIndex = index;
                shortValue = column;
            }
        });
        return shortIndex;
    };

    private setWatchers(): void {
        this.$scope.$watch(this.heightWatcher, this.arrangeContents);
        this.$scope.$watch(this.windowWatcher, this.arrangeContents);
        angular.element(this.$window).bind("resize", () => this.$scope.$apply());
    }

    private windowWatcher = (): string => {
        return `${this.$window.innerHeight}${this.$window.innerWidth}`;
    };

    private heightWatcher = (): string => {
        return this.items.reduce((accumulator: string, item: angular.IAugmentedJQuery) => {
            return accumulator + item[0].offsetHeight;
        }, "");
    }
}
