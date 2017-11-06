//
//  ElementRowView.m
//  StatusMenuApp
//
//  Created by Carlos Augusto Lima Borges on 28/08/12.
//  Copyright (c) 2012 Quiborgue. All rights reserved.
//

#import "ElementRowView.h"

@implementation ElementRowView

- (id)initWithFrame:(NSRect)frame
{    
    if ([arrayOfViews count] < 1){
        return nil;
    }
    
    ElementRowView *newView = [arrayOfViews objectAtIndex:0];
    [newView setFrame:frame];
    
    self = newView;
    return self;
}

- (void)drawRect:(NSRect)dirtyRect
{
    // Drawing code here.
}

@end
