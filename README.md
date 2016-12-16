# Overview
Based on the Startup project [https://github.com/IoBebe/ng2-webpack-adal-startup](https://github.com/IoBebe/ng2-webpack-adal-startup) 
i've created an example simulating an API call after an adalService.aquireToken request.
The purpose of this example is to demonstrate a BUG (i think) in  ng2-adal.

The BUG is that bindings to Observable<any[]> are not refreshed.

Adal uses an IFrame to make fetch the token, the whole angular2 app is loaded in that IFrame.
I suspect that interferes with the binding. My example shows 3 bindings:

1. a list binded to Observable<any[]> using async with an aquire token requst 
2. a list binded to Observable<any[]> using async and NO aquire token request
3. a list binded to string[] with an aquire token request

# Scenarios

### 1.Open a new tab
On opening the app, after the authentication step and the redirect back to the /oic route, the 3 bidings from above behave in the following way:

1. does not work
2. works
3. works only if the manual refresh ChangeDetectorRef.detectChanges() is in place

(you can also see in the console that the app is loaded in the IFrame as well.)

### 2.Refresh
On refreshing the app, having the token cached, there is no redirect to the /oic route and the 3 bindings behave in the following way:

1. works
2. works
3. works (regardless of the manual refresh)
 