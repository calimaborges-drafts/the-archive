//
//  QBGAppDelegate.h
//  StatusMenuApp
//
//  Created by Carlos Augusto Lima Borges on 20/08/12.
//  Copyright (c) 2012 Quiborgue. All rights reserved.
//

#import <Cocoa/Cocoa.h>

@interface QBGAppDelegate : NSObject <NSApplicationDelegate>

// GUI references
// Menus
@property (weak) IBOutlet NSMenu *statusMenu;
@property (strong) NSStatusItem *statusItem;

// Windows
@property (strong) IBOutlet NSWindow *scaffoldWindow;
@property (strong) IBOutlet NSPanel *preferencesPanel;

// Views
@property (weak) IBOutlet NSView *scaffoldView;

// Fields for Preferences
@property (weak) IBOutlet NSTextField *projectsPathTextField;

// Fields for Scaffold
@property (weak) IBOutlet NSTextField *scaffoldStringTextField;

// Rails Actions for Generate->Scaffold
- (IBAction)generateScaffoldClicked:(id)sender;

// GUI Methods for Menu
- (IBAction)clickedPreferences:(id)sender;
- (IBAction)clickedQuit:(id)sender;
- (IBAction)clickedRailsTest:(id)sender;
- (IBAction)clickedGenerateScaffold:(id)sender;
@end
