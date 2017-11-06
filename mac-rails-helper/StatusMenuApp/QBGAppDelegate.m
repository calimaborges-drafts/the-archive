//
//  QBGAppDelegate.m
//  StatusMenuApp
//
//  Created by Carlos Augusto Lima Borges on 20/08/12.
//  Copyright (c) 2012 Quiborgue. All rights reserved.
//

#import "QBGAppDelegate.h"

@interface QBGAppDelegate ()
- (void)runRailsWithArgs:(NSArray *)args;
- (NSString *)execAndReturn:(NSString *)command withArgs:(NSArray *)args parseEnv:(BOOL)parseEnv;
- (NSDictionary *)parseEnv;
- (NSString *)getRailsLaunchPath;
- (NSString *)getEnvFromUser;
@end


@implementation QBGAppDelegate
/***************************
 * PRIVATE METHODS
 ***************************/
@synthesize scaffoldView;
- (NSString *)getEnvFromUser {
    NSArray *args = [[NSArray alloc] initWithObjects:@"-l", @"-c", @"env", nil];
    return [self execAndReturn:@"/bin/bash" withArgs:args parseEnv:NO];
}

- (NSDictionary *)parseEnv {
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    NSArray *lines = [[self getEnvFromUser] componentsSeparatedByString:@"\n"];
    NSLog(@"%@", lines);
    
    for (NSString *line in lines) {
        NSArray *envVariable = [line componentsSeparatedByString:@"="];
        if ([envVariable count] < 2) continue;
        
        [dict setObject:[envVariable objectAtIndex:1] forKey:[envVariable objectAtIndex:0]];
    }
    
    return dict;
}

- (NSString *)execAndReturn:(NSString *)command withArgs:(NSArray *)args parseEnv:(BOOL)parseEnv {
    NSTask *task = [[NSTask alloc] init];
    
    [task setCurrentDirectoryPath:[self.projectsPathTextField stringValue]];
    [task setLaunchPath:command];
    [task setArguments:args];
    
    if (parseEnv) [task setEnvironment:[self parseEnv]];
    
    NSPipe *pipe = [NSPipe pipe];
    [task setStandardOutput:pipe];
    
    NSFileHandle *file = [pipe fileHandleForReading];
    [task launch];
    
    NSData *data = [file readDataToEndOfFile];
    
    NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    
    NSLog(@"%@ %@", command, args);
    return string;
}

- (NSString *)getRailsLaunchPath {
    NSArray *args = [[NSArray alloc] initWithObjects:@"rails", nil];
    return [self execAndReturn:@"/usr/bin/which" withArgs:args parseEnv:YES];
}

- (void)runRailsWithArgs:(NSArray *)args {
    NSString *railsPath = [self getRailsLaunchPath];
    railsPath = [railsPath substringToIndex:[railsPath length] - 1];
    NSString *string = [self execAndReturn:railsPath withArgs:args parseEnv:YES];
    NSLog(@"%@", string);
}

/***************************
 * APPLICATION METHODS
 ***************************/
- (void)awakeFromNib {
    self.statusItem = [[NSStatusBar systemStatusBar] statusItemWithLength:NSVariableStatusItemLength];
    [self.statusItem setMenu:self.statusMenu];
    [self.statusItem setTitle:@"R"];
    [self.statusItem setHighlightMode:YES];
    
    [self.projectsPathTextField setStringValue:@"/Users/calimaborges/RailsTeste/AppTeste"];
}

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    // Insert code here to initialize your application
}


/***************************
 * METHODS FOR MENU
 ***************************/
- (IBAction)clickedPreferences:(id)sender {
    [self.preferencesPanel makeKeyAndOrderFront:self];
}

- (IBAction)clickedQuit:(id)sender {
    exit(0);
}

- (IBAction)clickedRailsTest:(id)sender {
    NSString *string = [self getRailsLaunchPath];
    NSLog(@"returned: \n%@", string);
}


- (IBAction)clickedGenerateScaffold:(id)sender {
    [self.scaffoldWindow makeKeyAndOrderFront:self];
}

/***************************
 * METHODS FOR GENERATE->SCAFFOLD
 ***************************/
- (IBAction)generateScaffoldClicked:(id)sender {
    NSArray *arguments = [NSArray arrayWithObjects: @"generate", @"scaffold", @"Post", @"title:string", @"desc:text", nil];
    [self runRailsWithArgs:arguments];
}
@end
