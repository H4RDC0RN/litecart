import { Page } from '@playwright/test';
import { Header } from '../components/header';
import { SiteMenu } from '../components/site-menu';
import { NavigationPanel } from '../components/navigation-panel';

export class HomePage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;
    readonly navigation: NavigationPanel;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);
        this.navigation = new NavigationPanel(page);
    }

    async goto() { 
        await this.page.goto('/');
     }
}