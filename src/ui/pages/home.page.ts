import { Page } from '@playwright/test';
import { Header } from '@/ui/components/layout/header';
import { NavigationPanel } from '@/ui/components/layout/navigation-panel';
import { SiteMenu } from '@/ui/components/layout/site-menu';

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