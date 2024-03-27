export interface IMenuItem {
  id: string;
  Name: string;
  route?: string;
  child?: IMenuItem[];
  isVisible?: boolean;
  isCollapsed?: boolean;
}
export class MenuItem implements IMenuItem {
  id = Math.random().toString(36).substring(2, 12);
  isCollapsed = true;
  child: IMenuItem[] = [];

  constructor(
    public Name: string,
    public isVisible: boolean,
    public route: string
  ) {}
}
