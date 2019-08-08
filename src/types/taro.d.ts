declare namespace Taro {

    interface NavigateToArguments extends navigateTo.Param {
        params?: { [key: string]: any };
    }

    interface RedirectToArguments extends redirectTo.Param {
        params?: { [key: string]: any };
    }

    interface SwitchTabArguments extends switchTab.Param {
        params?: { [key: string]: any };
    }

    interface NavigateBackArguments extends navigateBack.Param {
        params?: { [key: string]: any };
    }

    interface ReLaunchArguments extends reLaunch.Param {
        params?: { [key: string]: any };
    }

    function navigateTo(parameter: NavigateToArguments): Promise<any>;
    function redirectTo(parameter: RedirectToArguments): Promise<any>;
    function switchTab(parameter: SwitchTabArguments): Promise<any>;
    function navigateBack(parameter: NavigateBackArguments): Promise<any>;
    function reLaunch(parameter: ReLaunchArguments): Promise<any>;

}

