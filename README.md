## 前言
TTmall 2.0 综合考虑后决定摒弃之前`MVC` 设计模式，采用`MVP` 的设计模式进行重构。在重构过程中极个别逻辑简单，相对独立的页面仍然采用`MVC` 的模式。

TTmall 2.0  解耦方式采用`target-action` 的方式 详情查看casatwy 文章 [iOS应用架构谈 组件化方案](https://casatwy.com/iOS-Modulization.html)

## 注意点
- 命名方式：类名以TTM开头
- 项目中尽量少使用宏定义，多使用常量
- 项目中`PublicModule`中类文件其他模块可直接引用，其他模块间的调用要使用`TTMMediator`进行协调以降低耦合

## 项目目录结构
- `Resource `
  存放Assets.xcassets 、pch、info.plist 等资源文件
- `PublicModule` 公共模块
   存放各模块都有可能使用的文件
- `LeafModule` 功能模块
   - `Main`: 主页、分类、 购物车、我的，等
   - `Goods`: 商品相关
   - `Order`:订单相关
   - `Pay`:结算支付相关
   - `Account`: 用户信息管理，登录等
   - `Search`:搜索相关
   - `Scan`:一维码二维码扫描
   - `Message`:消息中心
- `Pod`
  > `YTKNetwork`: [https://github.com/yuantiku/YTKNetwork](https://github.com/yuantiku/YTKNetwork)   
   `MJRefresh`: [https://github.com/CoderMJLee/MJRefresh](https://github.com/CoderMJLee/MJRefresh)   
   `SDWebImage`:[https://github.com/SDWebImage/SDWebImage](https://github.com/SDWebImage/SDWebImage)   
   `MJExtension`:[https://github.com/CoderMJLee/MJExtension](https://github.com/CoderMJLee/MJExtension)   
   `SDAutoLayout`:[https://github.com/gsdios/SDAutoLayout](https://github.com/gsdios/SDAutoLayout)   
   `FMDB`:[https://github.com/ccgus/fmdb](https://github.com/ccgus/fmdb)   
   `Qiniu`:[https://github.com/qiniu/objc-sdk](https://github.com/qiniu/objc-sdk)   
  `FDFullscreenPopGesture`:[https://github.com/forkingdog/FDFullscreenPopGesture](https://github.com/forkingdog/FDFullscreenPopGesture)   
   `AMapLocation`:[https://lbs.amap.com/api/ios-location-sdk/guide/create-project/cocoapods](https://lbs.amap.com/api/ios-location-sdk/guide/create-project/cocoapods)   
   `AMapSearch`:[https://lbs.amap.com/api/ios-location-sdk/guide/create-project/cocoapods](https://lbs.amap.com/api/ios-location-sdk/guide/create-project/cocoapods)   
   `QIYU_iOS_SDK`:[https://github.com/qiyukf/QIYU_iOS_SDK](https://github.com/qiyukf/QIYU_iOS_SDK)   
   `JPVideoPlayer`:[https://github.com/newyjp/JPVideoPlayer](https://github.com/newyjp/JPVideoPlayer)   
   `WechatOpenSDK`:[https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=1417694084&token=&lang=zh_CN](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=1417694084&token=&lang=zh_CN)   
   `ZFPlayer`:[https://github.com/renzifeng/ZFPlayer](https://github.com/renzifeng/ZFPlayer)   
   `OOMDetector`:[https://github.com/Tencent/OOMDetector](https://github.com/Tencent/OOMDetector)   
   `Weibo_SDK`:[https://github.com/sinaweibosdk/weibo_ios_sdk.git](https://github.com/sinaweibosdk/weibo_ios_sdk.git)   
   `LBXScan`:[https://github.com/MxABC/LBXScan](https://github.com/MxABC/LBXScan)   
   `TZImagePickerController`:[https://github.com/banchichen/TZImagePickerController](https://github.com/banchichen/TZImagePickerController)   
   `友盟`:[https://developer.umeng.com/docs/66632/detail/66898](https://developer.umeng.com/docs/66632/detail/66898)   


## TTMMediator 使用
#### TTMMediator说明
此类为项目解耦而生，采用`target-action` 的方式 详情查看casatwy 文章 [iOS应用架构谈 组件化方案](https://casatwy.com/iOS-Modulization.html)   
示例工程：[https://github.com/casatwy/CTMediator](https://github.com/casatwy/CTMediator)   
补充：本项目稍加修改就可以实现项目的组件化。详情参考：[https://casatwy.com/modulization_in_action.html](https://casatwy.com/modulization_in_action.html)

#### 使用
1. 在不同的模块下都有一个`Deploy`文件夹，该文件夹保存的是该模块的配置文件。在该文件加下创建名为`TTMTarget+模块名`的类文件，该类是外部模块调用该模块内容的统一入口。例如在`Account`模块该类名称为`TTMTargetAccount` 该类头文件如下：

```
#import <Foundation/Foundation.h>

@interface TTMTargetAccount : NSObject

/*! 获取普通登录界面 */
-(UINavigationController *)actionFetchLoginViewController:(NSDictionary *)params;
/*! 获取指纹登录界面 */
-(UIViewController *)actionFetchFingerprintLoginViewController:(NSDictionary *)params;
/*! 获取账户管理界面 */
-(UIViewController *)actionFetchAccountManagementViewController:(NSDictionary *)params;
/*! 获取设置界面 */
-(UIViewController *)actionFetchUserSetting:(NSDictionary *)params;
/*! 是否开启了指纹登录 */
-(NSNumber *)actionIsOpenFingerprintLogin:(NSDictionary *)params;
/*! 获取指纹登录界面 */
-(UIViewController *)actionFetchFingerprintSetViewController:(NSDictionary *)params;
/*! 注册 */
-(UIViewController *)actionFetchRegistNewAccountViewController:(NSDictionary *)params;
/*! 快速登录view */
-(UIView *)actionFastLoginView:(NSDictionary *)params;
/// 移除用户信息
-(id)actionRemoveUsrInfo:(NSDictionary *)params;
@end

```
该头文件提供了其他模块调用`Account`模块的所有方法。

2.方法命名注意点：
例如 获取普通登录界面

```
/*! 获取普通登录界面 */
-(UINavigationController *)actionFetchLoginViewController:(NSDictionary *)params;

/*! 获取普通登录界面 */
-(UINavigationController *)actionFetchLoginViewController:(NSDictionary *)params{
    TTMLoginViewController * login = [[TTMLoginViewController alloc]init];
    login.loginAction = params[@"loginAction"];
    UINavigationController * navi = [[UINavigationController alloc]initWithRootViewController:login];
    return navi;
}
```
* 方法必有一个返回值可以是任意类型。
* 方法中必须有一个统一参数`params`类型为`NSDictionary`。
* 方法必须以`action`开头（在本项目中是这样定的）。
* 方法实现部分从`params`中接收其他模块传来的参数，然后赋值并将其他模块需要的东西返回

3.在`PublicModule -> Mediator`文件夹中放置的是`TTMMediator`及其分类，不同模块都应创建一个`TTMMediator`分类 方便管理和调用。先看看`TTMMediator.m`
```
static NSString * const kTTMTargetPrefix = @"TTMTarget";
static NSString * const kTTActionsPrefix = @"action";
```
这里定义两个常量，这就是之前约定的各个模块的`target`使用`TTMTarget`开头，`action`方法使用`action`开头的原因
再看看核心方法`performTarget: action: params: shouldCacheTarget:`

```
- (id)performTarget:(NSString *)targetName action:(NSString *)actionName params:(NSDictionary *)params shouldCacheTarget:(BOOL)shouldCacheTarget
{

    NSString *targetClassString = [NSString stringWithFormat:@"%@%@",kTTMTargetPrefix,targetName];
    NSString *actionString = [NSString stringWithFormat:@"%@%@:",kTTActionsPrefix ,actionName];
    Class targetClass;

    NSObject *target = self.cachedTarget[targetClassString];
    if (target == nil) {
        targetClass = NSClassFromString(targetClassString);
        target = [[targetClass alloc] init];
    }

    SEL action = NSSelectorFromString(actionString);

    if (target == nil) {
        // 这里是处理无响应请求的地方之一，这个demo做得比较简单，如果没有可以响应的target，就直接return了。实际开发过程中是可以事先给一个固定的target专门用于在这个时候顶上，然后处理这种请求的
        [self NoTargetActionResponseWithTargetString:targetClassString selectorString:actionString originParams:params];
        return nil;
    }

    if (shouldCacheTarget) {
        self.cachedTarget[targetClassString] = target;
    }

    if ([target respondsToSelector:action]) {
        return [self safePerformAction:action target:target params:params];
    } else {
        // 有可能target是Swift对象
        actionString = [NSString stringWithFormat:@"%@%@WithParams:", kTTActionsPrefix,actionName];
        action = NSSelectorFromString(actionString);
        if ([target respondsToSelector:action]) {
            return [self safePerformAction:action target:target params:params];
        } else {
            // 这里是处理无响应请求的地方，如果无响应，则尝试调用对应target的notFound方法统一处理
            SEL action = NSSelectorFromString(@"notFound:");
            if ([target respondsToSelector:action]) {
                return [self safePerformAction:action target:target params:params];
            } else {
                // 这里也是处理无响应请求的地方，在notFound都没有的时候，这个demo是直接return了。实际开发过程中，可以用前面提到的固定的target顶上的。
                [self NoTargetActionResponseWithTargetString:targetClassString selectorString:actionString originParams:params];
                [self.cachedTarget removeObjectForKey:targetClassString];
                return nil;
            }
        }
    }
}
```
此方法通过`runtime`调用其他模块方法来实现解耦
例如在`TTMMediator`为`Account`模块创建的分类`TTMMediator+Account.m`中
```
/// Account为模块名称
static NSString * const kTTMTargetAccount = @"Account";
/// 注意这里的@"FetchLoginViewController" 和 TTMTargetAccount 中`-(UINavigationController *)actionFetchLoginViewController:(NSDictionary *)params`方法相对应
static NSString * const kTTMActionFetchLoginViewController = @"FetchLoginViewController";

/*! 获取普通登录界面 */
-(UINavigationController *)mediatorFetchLoginViewControllerWitAction:(NSString *)loginAction{
    UINavigationController * login = [self performTarget:kTTMTargetAccount
                                                  action:kTTMActionFetchLoginViewController
                                                  params:@{@"loginAction":TTFiltNil(loginAction)}
                                       shouldCacheTarget:NO];
    if ([login isKindOfClass:[UINavigationController class]]) {
        return login;
    }else{
        NSLog(@"%@",kExceptionHandling);
    }
    return nil;
}
```
可以看到该方法通过调用`performTarget: action: params: shouldCacheTarget:` 利用`runtime`调用了`Account`模块`TTMTargetAccount`的`-(UINavigationController *)actionFetchLoginViewController:(NSDictionary *)params;`方法，并且进行了赋值,整个过程其他模块未直接引用`Account`模块任何类，从而达到解耦效果。


## 网络请求全局拦截器
本次重构采用更加面向对象的方式进行网络请求，采用了`YTKNetwork`的框架，本项目进行二次封装`TTMRequest`继承了`YTKRequest`，项目中所用网络请求都继承自`TTMRequest`.
所以全局网络请求拦截器在`TTMRequest`中实现
```
/// 重写父类方法 全局请求拦截
-(void)startWithCompletionBlockWithSuccess:(YTKRequestCompletionBlock)success failure:(YTKRequestCompletionBlock)failure{

    YTKRequestCompletionBlock interceptCompletionBlock = ^(__kindof YTKBaseRequest * _Nonnull request) {
        NSDictionary * response  = request.responseObject;
        if ([response isKindOfClass:[NSDictionary class]]) {
            NSInteger code = ResponseCode(response);
            switch (code) {
                case 1105:
                case 1106:
                case 1108:
                    /// 重新登录
                    [[NSNotificationCenter defaultCenter] postNotificationName:kReLoginNotification object:nil];
                    break;
                case 1104:
                    /// 刷新用户token
                    [[NSNotificationCenter defaultCenter] postNotificationName:kRefreshUserTokenNotification object:nil];
                    break;
                case 1102:
                case 1107:
                    /// 刷新saas token
                    [[NSNotificationCenter defaultCenter] postNotificationName:kRefreshSaaSTokenNotification object:nil];
                    break;
                default:
                    break;
            }
        }
        success(request);
    };
    [super startWithCompletionBlockWithSuccess:interceptCompletionBlock failure:failure];
}
```
## Token刷新逻辑
首次启动在`TTMUserGuideViewController`中进行了Touken相关的操作，具体看代码便可明白。
不是首次启动在`TTMAdView`进行了Token相关的操作，具体看代码便可明白。
在使用过程中Token过期的情况，
## AppDelegate减负
## 自动更换icon功能（未测试）
## 转场动画注意事项
## 自动生成API文档注意事项