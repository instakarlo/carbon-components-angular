import {
	Directive,
	ElementRef,
	ViewContainerRef,
	Input,
	TemplateRef,
	HostListener
} from "@angular/core";
import { DialogDirective } from "./../dialog.directive";
import { DialogService } from "./../dialog.service";
import { OverflowMenuPane } from "./overflow-menu-pane.component";


/**
 * Directive for extending `Dialog` to create overflow menus.
 *
 * class: OverflowMenuDirective (extends DialogDirective)
 *
 *
 * selector: `ibmOverflowMenu`
 *
 *
 * ```html
 * <div [ibmOverflowMenu]="templateRef"></div>
 * <ng-template #templateRef>
 * 	<!-- overflow menu options here -->
 * </ng-template>
 * ```
 */
@Directive({
	selector: "[ibmOverflowMenu]",
	exportAs: "ibmOverflowMenu",
	providers: [
		DialogService
	]
})
export class OverflowMenuDirective extends DialogDirective {
	/**
	 * Takes a template ref of `OverflowMenuOptions`s
	 */
	@Input() ibmOverflowMenu: TemplateRef<any>;
	/**
	 * Controls wether the overflow menu is flipped
	 */
	@Input() flip = false;
	/**
	 * Vertical offset for the position of the dialog
	 */
	@Input() verticalOffset = 0;
	/**
	 * Horizontal offset for the position of the dialog
	 */
	@Input() horizontalOffset = 0;

	/**
	 * Classes to add to the dialog container
	 */
	@Input() wrapperClass = '';

	/**
	 * Creates an instance of `OverflowMenuDirective`.
	 */
	constructor(
		protected elementRef: ElementRef,
		protected viewContainerRef: ViewContainerRef,
		protected dialogService: DialogService
	) {
		super(elementRef, viewContainerRef, dialogService);
		dialogService.create(OverflowMenuPane);
	}

	updateConfig() {
		this.dialogConfig.content = this.ibmOverflowMenu;
		this.dialogConfig.flip = this.flip;
		this.dialogConfig.verticalOffset = this.verticalOffset;
		this.dialogConfig.horizontalOffset = this.horizontalOffset;
	}

	onDialogInit() {
		this.updateConfig();
	}

	onDialogChanges() {
		this.updateConfig();
	}

	@HostListener("keydown", ["$event"])
	hostkeys(event: KeyboardEvent) {
		switch (event.key) {
			case "Enter":
			case " ":
				event.preventDefault();
				break;
		}
	}
}
