function GetPluginSettings()
{
	return {
		"name":			"CocoonJS Extended",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"CJSExtended",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Access CocoonJS other extensions like Facebook.",
		"author":		"Carlos Augusto Lima Borges",
		"help url":		"https://github.com/calimaborges/construct2-cocoonjs-extended-plugin",
		"category":		"Platform specific",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		pf_singleglobal		// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
		// "dependency":	"channel.html"
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions
AddCondition(0, 0, "Is available", "Facebook", "Is Facebook available", "Check if the Facebook service is available.", "IsFBAvailable");

AddCondition(1, 0, "Is logged in", "Facebook", "Is logged in to Facebook", "True if the user has successfully logged in to Facebook", "IsFBLoggedIn");

AddCondition(2, cf_trigger, "On login succeeded", "Facebook", "On Facebook login succeeded", "Triggered when the user successfully completes a Facebook login.", "OnFBLoginSuccess");

AddCondition(3, cf_trigger, "On login failed", "Facebook", "On Facebook login failed", "Triggered when the user fails to complete a Facebook login.", "OnFBLoginFail");

AddCondition(4, cf_trigger, "On score received", "Facebook", "On score received", "Triggered after requesting a score completes successfully.", "OnFBScoreReceived");

AddCondition(5, cf_trigger, "On score unavailable", "Facebook", "On score unavailable", "Triggered after requesting a score fails to complete successfully.", "OnFBScoreUnavailable");

AddCondition(6, cf_trigger, "On score submit success", "Facebook", "On score submit success", "Triggered after submitting a score completes successfully.", "OnFBScoreSubmitSuccess");

AddCondition(7, cf_trigger, "On score submit fail", "Facebook", "On score submit fail", "Triggered after submitting a score fails to complete successfully.", "OnFBScoreSubmitFail");

AddCondition(8, cf_trigger, "On leaderboard request done", "Facebook", "On leaderboard requested all", "Triggered when the leaderboard requests has ended.", "OnFBLeaderboardSucceeded");

AddCondition(9, cf_trigger, "On leaderboard request failed", "Facebook", "On leaderboard request failed", "Triggered when the leaderboard request failed", "OnFBLeaderboardFailed");

AddCondition(10, cf_trigger, "On logout", "Facebook", "On Facebook logout", "Triggered when the user logs out from Facebook.", "OnFBLogout");

AddCondition(11, cf_trigger, "On ready", "Facebook", "On Facebook ready", "Triggered when the initialization method of Facebook has runned.", "OnFBReady");

AddCondition(12, 0, "Is ready", "Facebook", "Is Facebook ready", "Check if the Facebook service is ready.", "IsFBReady");

AddCondition(13, cf_trigger, "On init fail", "Facebook", "On Facebook initialization failed", "Triggered if facebook initialization failed.", "OnFBInitFail");

AddCondition(14, cf_trigger, "On score info arrived", "Facebook", "On score info arrived", "Triggered for each score obtained.", "OnFBLeaderboardScore");
// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
// AddNumberParam("Number", "Enter a number to test if positive.");
// AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
// AddStringParam("Message", "Enter a string to alert.");
// AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");
AddAction(0, 0, "Request login", "Facebook", "Request login", "Request the user to log in to Facebook.", "FBLogin");

AddNumberParam("Score", "The score to submit to Facebook.");
AddAction(1, 0, "Submit score", "Facebook", "Submit score of <i>{0}</i>", "Submit a score to Facebook.", "FBSubmitScore");

AddAction(2, 0, "Request user score", "Facebook", "Request user score", "Request the user's current best score from Facebook", "FBRequestScore");

AddAction(3, 0, "Request scoreboard", "Facebook", "Request facebook scoreboard", "Open the Facebook leaderboard view.", "FBRequestScoreboard");

AddAction(4, 0, "Request logout", "Facebook", "Request logout", "Request the user to log out of Facebook.", "FBLogout");


////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, "", "Facebook", "FacebookScore", "Return the score requested from Facebook or current score from leaderboard.");
AddExpression(1, ef_return_string, "", "Facebook", "FacebookImageUrl", "Return the current image URL from leaderboard.");
AddExpression(2, ef_return_any, "", "Facebook", "FacebookUserID", "Return the current user ID  from leaderboard.");
AddExpression(3, ef_return_string, "", "Facebook", "FacebookUsername", "Return the current username from leaderboard.");
AddExpression(4, ef_return_number, "", "Facebook", "FacebookRank", "Return the current position from leaderboard.");
AddExpression(5, ef_return_number, "", "Time", "CurrentTimestamp", "Return the current timestamp from system.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
		new cr.Property(ept_text,		"App ID",		"",			"The App ID Facebook gives you after creating an app.")
	];

	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}