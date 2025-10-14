export const FB_TOKEN_SCRIPT = `
(async function() {
    if (!confirm("Are you sure you want to run this script in your Facebook console? This script is designed to generate an access token locally in your browser.")) {
        console.log("Script execution cancelled by user.");
        return;
    }

    function showTokenModal(token) {
        const modalId = 'fb-token-modal-container';
        if (document.getElementById(modalId)) return;

        const overlay = document.createElement('div');
        overlay.id = modalId;
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;';
        
        const modal = document.createElement('div');
        modal.style.cssText = 'background-color: #2d3748; color: #e2e8f0; padding: 25px; border-radius: 8px; width: 90%; max-width: 500px; font-family: sans-serif; box-shadow: 0 5px 15px rgba(0,0,0,0.5); border: 1px solid #4a5568;';

        const title = document.createElement('h2');
        title.textContent = '✅ Access Token Generated';
        title.style.cssText = 'font-size: 20px; font-weight: bold; margin-top: 0; margin-bottom: 15px; color: #68d391;';
        
        const description = document.createElement('p');
        description.textContent = 'Your access token is ready. Copy it below. Do not share it with anyone!';
        description.style.cssText = 'font-size: 14px; margin-bottom: 20px; color: #a0aec0;';

        const tokenArea = document.createElement('textarea');
        tokenArea.value = token;
        tokenArea.readOnly = true;
        tokenArea.style.cssText = 'width: 100%; height: 120px; background-color: #1a202c; color: #cbd5e0; border: 1px solid #4a5568; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px; resize: none; box-sizing: border-box;';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; justify-content: flex-end; margin-top: 20px; gap: 10px;';

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Token';
        copyButton.style.cssText = 'background-color: #3182ce; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; transition: background-color 0.2s;';
        copyButton.onmouseover = () => { if(copyButton.textContent === 'Copy Token') copyButton.style.backgroundColor = '#2b6cb0'; };
        copyButton.onmouseout = () => { if(copyButton.textContent === 'Copy Token') copyButton.style.backgroundColor = '#3182ce'; };
        copyButton.onclick = () => {
            tokenArea.select();
            document.execCommand('copy');
            copyButton.textContent = 'Copied!';
            copyButton.style.backgroundColor = '#38a169';
            setTimeout(() => {
                copyButton.textContent = 'Copy Token';
                copyButton.style.backgroundColor = '#3182ce';
            }, 2000);
        };

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.cssText = 'background-color: #718096; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;';
        closeButton.onmouseover = () => { closeButton.style.backgroundColor = '#4a5568'; };
        closeButton.onmouseout = () => { closeButton.style.backgroundColor = '#718096'; };
        closeButton.onclick = () => {
            document.body.removeChild(overlay);
        };
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        };

        buttonContainer.appendChild(closeButton);
        buttonContainer.appendChild(copyButton);
        modal.appendChild(title);
        modal.appendChild(description);
        modal.appendChild(tokenArea);
        modal.appendChild(buttonContainer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    try {
        console.log("Starting token generation process...");

        const userId = document.cookie.split(';').find(row => row.trim().startsWith('c_user='))?.split('=')[1];
        if (!userId) {
            alert("Could not find user ID. Please make sure you are logged into Facebook and on a main page like your news feed.");
            return;
        }
        console.log("Found User ID:", userId);
        
        const fbDtsg = window.require("DTSGInitialData").token;
        if (!fbDtsg) {
            alert("Could not find required security token (fb_dtsg). This can happen if you are not on a standard Facebook page (like the news feed) or if Facebook has updated its site. Please try navigating to facebook.com and running the script again.");
            return;
        }
        console.log("Found fb_dtsg token.");
        
        const generateGuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => ("x" === c ? (Math.random() * 16 | 0) : (Math.random() * 4 | 8)).toString(16));
        
        const variables = {
            input: {
                client_mutation_id: "4",
                actor_id: userId,
                config_enum: "GDP_CONFIRM",
                device_id: null,
                experience_id: generateGuid(),
                extra_params_json: JSON.stringify({
                    app_id: "350685531728",
                    kid_directed_site: "false",
                    logger_id: \`"\${generateGuid()}"\`,
                    next: '"confirm"',
                    redirect_uri: '"https://www.facebook.com/connect/login_success.html"',
                    response_type: '"token"',
                    return_scopes: "false",
                    scope: '["user_subscriptions","user_videos","user_website","user_work_history","friends_about_me","friends_actions.books","friends_actions.music","friends_actions.news","friends_actions.video","friends_activities","friends_birthday","friends_education_history","friends_events","friends_games_activity","friends_groups","friends_hometown","friends_interests","friends_likes","friends_location","friends_notes","friends_photos","friends_questions","friends_relationship_details","friends_relationships","friends_religion_politics","friends_status","friends_subscriptions","friends_videos","friends_website","friends_work_history","ads_management","create_event","create_note","export_stream","friends_online_presence","manage_friendlists","manage_notifications","manage_pages","photo_upload","publish_stream","read_friendlists","read_insights","read_mailbox","read_page_mailboxes","read_requests","read_stream","rsvp_event","share_item","sms","status_update","user_online_presence","video_upload","xmpp_login"]',
                    steps: "{}",
                    tp: '"unspecified"',
                    cui_gk: '"[PASS]:""',
                    is_limited_login_shim: "false"
                }),
                flow_name: "GDP",
                flow_step_type: "STANDALONE",
                outcome: "APPROVED",
                source: "gdp_delegated",
                surface: "FACEBOOK_COMET"
            }
        };

        const formBody = new URLSearchParams({
            doc_id: "6494107973937368",
            variables: JSON.stringify(variables),
            fb_dtsg: fbDtsg,
            server_timestamps: true
        });
        
        console.log("Sending request to Facebook GraphQL API...");
        
        const response = await fetch("https://www.facebook.com/api/graphql/", {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            body: formBody.toString()
        });

        const data = await response.json();
        console.log("Received response from server.");

        const redirectUri = data.data.run_post_flow_action.uri;
        if (!redirectUri) throw new Error("Invalid response from server (step 1). Could not find redirect URI.");

        const redirectParams = new URLSearchParams(redirectUri.split("?")[1]);
        if (!redirectParams.has("close_uri")) throw new Error("Invalid response from server (step 2). Could not find close_uri.");

        const closeUri = decodeURIComponent(redirectParams.get("close_uri"));
        if (!closeUri.includes("#access_token=")) throw new Error("Invalid response from server (step 3). Token parameter not found in close_uri.");

        const tokenParams = new URLSearchParams(closeUri.split("#")[1]);
        const accessToken = tokenParams.get("access_token");
        if (!accessToken) throw new Error("Could not extract access token from the final URL.");
        
        console.log("Token successfully generated!");
        showTokenModal(accessToken);

    } catch (error) {
        console.error("An error occurred during token generation:", error);
        alert(\`An error occurred: \${error.message}\\n\\nThis could be because you are not logged in, or Facebook has updated its website. Check the console for more details.\`);
    }
})();
`
