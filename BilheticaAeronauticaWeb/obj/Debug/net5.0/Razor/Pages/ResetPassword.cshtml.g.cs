#pragma checksum "C:\Users\gnoo\Documents\CINEL\Prog.WEB\BilheticaAeronauticaWeb\BilheticaAeronauticaWeb\Pages\ResetPassword.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "26b1c7b82ff8b536f26769b91416e0526b5677ee"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_ResetPassword), @"mvc.1.0.view", @"/Pages/ResetPassword.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"26b1c7b82ff8b536f26769b91416e0526b5677ee", @"/Pages/ResetPassword.cshtml")]
    #nullable restore
    public class Pages_ResetPassword : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<html>\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "26b1c7b82ff8b536f26769b91416e0526b5677ee2784", async() => {
                WriteLiteral("\r\n        <meta name=\"viewport\" content=\"width=device-width\" />\r\n         <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css\">\r\n    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "26b1c7b82ff8b536f26769b91416e0526b5677ee3933", async() => {
                WriteLiteral(@"
         <section class=""hero is-fullheight"">
        <div class=""hero-body"">
            <div class=""container has-text-centered"">
                <div class=""column is-4 is-offset-4"">
                   
                    <p class=""subtitle has-text-black"">Reset your password</p>
                    <div class=""box"">
                        
                        <form id=""my-form"" method=""get"">
                            <div class=""field"">
                                  <p class=""control has-icons-left has-icons-right"">
                                    <input class=""input"" type=""email"" placeholder=""Email"">
                                    
                                   
                                  </p>
                                </div>
                                <div class=""field"">
                                  <p class=""control has-icons-left"">
                                    <input class=""input"" type=""password"" placeholder=""Password"">
     ");
                WriteLiteral(@"                               
                                  </p>
                                </div>
                           
                           
                            <button type=""button"" onclick=""resetPassword()""
                                class=""button is-block is-success is-fullwidth"">Reset Password</button>
                        </form>
                    </div>
                    <p class=""has-text-grey"">
                        <a href=""../"">Sign Up</a> &nbsp;??&nbsp;
                        <a href=""../"">Forgot Password</a> &nbsp;??&nbsp;
                        <a href=""../"">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
        
    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
     
   
    <script type=""text/javascript"">
             function resetPassword() {
                const params = new URLSearchParams(window.location.search);
                let URL = window.location.protocol + ""//"" + window.location.host + ""/"" + ""api/Account/resetuserpassword"";
                 let homeURL = window.location.protocol + ""//"" + window.location.host + ""/"";

                let token;

                let obj = {
                    Token : """",
                    UserName: """",
                    Password: """"
                };

                 if (params.has('token')) {
                    obj.Token = params.get('token');
                }


                const form = document.getElementById('my-form');
                Array.from(form.elements).forEach(element => {
                  
                    if (element.type !== ""button"") {
                        if (element.type === ""email"") {
                        obj.UserName = element.value;
               ");
            WriteLiteral(@"         }
                        if (element.type === ""password"") {
                            obj.Password = element.value;
                        }
                    }
                    
                });

                 console.log(URL);
                fetch(URL, {
                      method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(obj)
                    })
                    .then(result => {
                       window.location.href = ""/login"";
                    })
                  .catch(error => console.log(error))

            }
        </script>
</html>");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591
