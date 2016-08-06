export class HeaderController {
    isDrawerOpen: boolean = false;

    toggleDrawer(): void { this.isDrawerOpen = !this.isDrawerOpen; }

    getDrawerOpenClass(): string {
        let clazz = "";
        if (this.isDrawerOpen) { clazz += "dropdown--active"; }
        return clazz;
    }
}
